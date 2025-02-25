import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { checkOutStyle } from './Style';


const CheckoutForm = () => {
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
    landmark: '',
  });

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView style={checkOutStyle.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Full Name*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={text => handleChange('fullName', text)}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Email ID*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={text => handleChange('email', text)}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Mobile Number*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={text => handleChange('mobile', text)}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Alternate Mobile Number (Optional)</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Alternate Mobile Number"
            keyboardType="phone-pad"
            value={form.altMobile}
            onChangeText={text => handleChange('altMobile', text)}
          />
        </View>

        <View style={checkOutStyle.rowContainer}>
          <View style={[checkOutStyle.inputContainer, checkOutStyle.halfWidthInput]}>
            <Text style={checkOutStyle.label}>Pincode*</Text>
            <TextInput
              style={checkOutStyle.input}
              placeholder="Pincode"
              keyboardType="number-pad"
              value={form.pincode}
              onChangeText={text => handleChange('pincode', text)}
            />
          </View>
          <View style={[checkOutStyle.inputContainer, checkOutStyle.halfWidthInput]}>
            <Text style={checkOutStyle.label}>State*</Text>
            <TextInput
              style={checkOutStyle.input}
              placeholder="State"
              value={form.state}
              onChangeText={text => handleChange('state', text)}
            />
          </View>
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Flat, House No., Building, Company*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Address"
            value={form.address}
            onChangeText={text => handleChange('address', text)}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>
            Area, Colony, Street, Sector, Village*
          </Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Area, Colony, Street, Sector, Village"
            value={form.area}
            onChangeText={text => handleChange('area', text)}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Country*</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Country"
            value={form.country}
            editable={false}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Landmark (Optional)</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Landmark"
            value={form.landmark}
            onChangeText={text => handleChange('landmark', text)}
          />
        </View>

        <TouchableOpacity style={checkOutStyle.saveButton} disabled={true}>
          <Text style={checkOutStyle.saveButtonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutForm;
