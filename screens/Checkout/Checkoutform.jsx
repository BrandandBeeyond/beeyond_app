import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {checkOutStyle} from './Style';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addShippingInfo, editShippingInfo} from '../../redux/actions/UserAction';
import {globalStyle} from '../../assets/styles/globalStyle';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const {user} = useSelector(state => state.user);
  const addressToEdit = route.params?.addressToEdit;

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingCityState, setFetchingCityState] = useState(false);
  const [cityStateFetched, setCityStateFetched] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    altMobile: '',
    pincode: '',
    city: '',
    state: '',
    flatNo: '',
    area: '',
    country: 'INDIA',
    type: 'Home',
    landmark: '',
  });

  // Prefill on edit
  useEffect(() => {
    if (addressToEdit) {
      setForm(prevForm => ({
        ...prevForm,
        ...addressToEdit,
      }));
      setCityStateFetched(true); // If editing, assume data is complete
    } else if (user) {
      setForm(prevForm => ({
        ...prevForm,
        fullName: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
      }));
    }
  }, [user, addressToEdit]);

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
      } else if (name === 'pincode' && value.trim().length !== 6) {
        message = 'pincode must be 6 digits';
      }
    }
    setErrors(prevErrors => ({...prevErrors, [name]: message}));
  };

  const fetchCityState = async pincode => {
    setFetchingCityState(true);
    setCityStateFetched(false);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === 'Success') {
        setForm(prevForm => ({
          ...prevForm,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
        setCityStateFetched(true);
      } else {
        Alert.alert('Invalid postalCode', 'Please enter a valid postalCode.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch city and state. Try again.');
    } finally {
      setFetchingCityState(false);
    }
  };

  const handleSaveAddress = async () => {
    if (
      !form.fullName?.trim() ||
      !form.email?.trim() ||
      !form.mobile?.trim() ||
      !form.area?.trim() ||
      !form.pincode?.trim() ||
      !form.state?.trim() ||
      !form.city?.trim() ||
      !form.flatNo?.trim()
    ) {
      Alert.alert('Please fill all required fields correctly.');
      return;
    }

    if (!user || !user._id) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    const payload = {
      flatNo: form.flatNo || '',
      area: form.area || '',
      landmark: form.landmark || '',
      city: form.city || '',
      state: form.state || '',
      mobile: form.mobile || '',
      pincode: form.pincode || '',
      country: form.country || 'INDIA',
      type: form.type || 'Home',
      isDefault: true,
    };

    setLoading(true);

    try {
      if (addressToEdit && addressToEdit._id) {
        // Simulate update logic (replace this with updateShippingInfo if available)
        await dispatch(editShippingInfo(addressToEdit._id,payload));
        
        Alert.alert('Success', 'Address updated successfully.');
      } else {
        await dispatch(addShippingInfo(user._id, payload));
      }

      navigation.navigate('SelectAddress');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={checkOutStyle.container}>
      <Spinner visible={fetchingCityState}/>
      <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
        {[
          {name: 'fullName', label: 'Full Name*'},
          {name: 'email', label: 'Email ID*', keyboardType: 'email-address'},
          {name: 'mobile', label: 'Mobile Number*', keyboardType: 'phone-pad'},
          {name: 'altMobile', label: 'Alternate Mobile Number (Optional)', keyboardType: 'phone-pad', optional: true},
          {name: 'pincode', label: 'pincode*', keyboardType: 'number-pad'},
          {name: 'city', label: 'City*', editable: cityStateFetched},
          {name: 'state', label: 'State*', editable: cityStateFetched},
          {name: 'flatNo', label: 'Flat, House No., Building, Company*'},
          {name: 'area', label: 'Area, Colony, Street, Sector, Village*'},
          {name: 'landmark', label: 'Landmark (Optional)', optional: true},
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
          style={[checkOutStyle.saveButton, {opacity: loading ? 0.5 : 1}]}
          onPress={handleSaveAddress}
          disabled={loading}>
          {loading ? (
            <View style={[globalStyle.drow, globalStyle.alignCenter, globalStyle.cg3]}>
              <ActivityIndicator color="#fff" />
              <Text style={checkOutStyle.saveButtonText}>SAVING...</Text>
            </View>
          ) : (
            <Text style={checkOutStyle.saveButtonText}>
              {addressToEdit ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutForm;
