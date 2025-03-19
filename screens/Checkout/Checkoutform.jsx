import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {checkOutStyle} from './Style';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addShippingInfo} from '../../redux/actions/UserAction';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    altMobile: '',
    pincode: '',
    city: '',
    state: '',
    address: '',
    area: '',
    country: 'INDIA',
    type: 'Home',
    landmark: '',
  });

  useEffect(() => {
    if (user) {
      setForm(prevForm => ({
        ...prevForm,
        fullName: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
      }));
    }
  }, [user]);

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
    validateField(name, value);

    if (name === 'pincode' && value.length === 6) {
      fetchCityState(value);
    }
  };

  const validateField = (name, value) => {
    let message = '';
    if (!value?.trim()) {
      message = 'This field is required';
    } else {
      if (name === 'mobile' && value.trim().length !== 10) {
        message = 'Mobile number must be 10 digits';
      } else if (
        name === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        message = 'Please enter a valid email';
      } else if (name === 'postalCode' && value.trim().length !== 6) {
        message = 'postalCode must be 6 digits';
      }
    }
    setErrors(prevErrors => ({...prevErrors, [name]: message}));
  };

  const fetchCityState = async pincode => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      const data = await response.json();

      if (data[0].Status === 'Success') {
        setForm(prevForm => ({
          ...prevForm,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
      } else {
        Alert.alert('Invalid postalCode', 'Please enter a valid postalCode.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch city and state. Try again.');
    }
  };

  const handleSaveAddress = () => {
    if (
      !form.flatNo.trim() ||
      !form.area.trim() ||
      !form.pincode.trim() ||
      !form.state.trim() ||
      !form.city.trim() ||
      !form.phoneNumber.trim()
    ) {
      Alert.alert('Please fill all required fields correctly.');
      return;
    }

    if (!user?._id) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    // ✅ Dispatch addShippingInfo API with userId
    dispatch(addShippingInfo(user._id, form))
      .then(() => {
        Alert.alert('Success', 'Address saved successfully!');
        navigation.navigate('SavedAddress');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to save address.');
      });
  };

  return (
    <SafeAreaView style={checkOutStyle.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        {[
          {
            name: 'fullName',
            label: 'Full Name*',
          },
          {
            name: 'email',
            label: 'Email ID*',
            keyboardType: 'email-address',
          },
          {
            name: 'mobile',
            label: 'Mobile Number*',
            keyboardType: 'phone-pad',
          },
          {
            name: 'altMobile',
            label: 'Alternate Mobile Number (Optional)',
            keyboardType: 'phone-pad',
            optional: true,
          },
          {
            name: 'pincode',
            label: 'pincode*',
            keyboardType: 'number-pad',
          },
          {
            name: 'city',
            label: 'City*',
            editable: false,
          },
          {
            name: 'state',
            label: 'State*',
            editable: false,
          },
          {
            name: 'address',
            label: 'Flat, House No., Building, Company*',
          },
          {
            name: 'area',
            label: 'Area, Colony, Street, Sector, Village*',
          },
          {
            name: 'landmark',
            label: 'Landmark (Optional)',
            optional: true,
          },
        ].map(field => (
          <View key={field.name} style={checkOutStyle.inputContainer}>
            <Text style={checkOutStyle.label}>{field.label}</Text>
            <TextInput
              style={checkOutStyle.input}
              placeholder={field.label}
              keyboardType={field.keyboardType || 'default'}
              value={form[field.name]}
              onChangeText={text => handleChange(field.name, text)}
              editable={field.editable !== false}
            />
            {errors[field.name] && !field.optional && (
              <Text style={checkOutStyle.errorText}>{errors[field.name]}</Text>
            )}
          </View>
        ))}

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Country*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Country"
            value={form.country}
            editable={false}
          />
        </View>

        <TouchableOpacity
          style={checkOutStyle.saveButton}
          onPress={handleSaveAddress}>
          <Text style={checkOutStyle.saveButtonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutForm;
