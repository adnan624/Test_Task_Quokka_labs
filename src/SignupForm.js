import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { signup } from './redux/actions';

export const SignupScreen = () => {
const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email && password) {
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            
          }
      
          if (!validatePassword(password)) {
            Alert.alert(
              'Invalid Password',
              'Password must be at least 8 characters long and contain at least 1 uppercase letter and 1 number and one symbol.'
            );
            return;
          }
          if (validateEmail(email) && validatePassword(password)) {
              auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                  dispatch(signup(res))
                Alert.alert('User account created successfully');
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  Alert.alert('That email address is already in use!');
                }
            
                if (error.code === 'auth/invalid-email') {
                  Alert.alert('That email address is invalid!');
                }
            
                console.error(error);
              });
          }
       
    } else {
        Alert.alert('please fill the both the fileds')
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    console.log(password)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    ;
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password)?true:false;
  };
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

