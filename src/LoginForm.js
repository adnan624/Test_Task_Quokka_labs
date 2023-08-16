import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, } from 'react-native';
import auth from '@react-native-firebase/auth';
import { login } from './redux/actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('LOGIN', JSON.stringify(value));
  } catch (e) {
    console.log(e)
  }
};


const CheckBox = ({ checked }) => {
  const [check, setChek] = useState(true)
  useEffect(() => {
    checked(check)
  }, [check])
  return (

    <View style={{ height: 30, width: 30, backgroundColor: "white", borderWidth: 1, justifyContent: 'center', alignItems: "center" }}>
      <TouchableOpacity onPress={() => { setChek(!check) }}>
        <View style={{ height: 25, width: 25, backgroundColor: check ? "white" : 'green', borderWidth: 1, }}>
        </View>
      </TouchableOpacity>
    </View>

  )
}

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()


  //   if (!validateEmail(email)) {
  //     Alert.alert('Invalid Email', 'Please enter a valid email address.');
  //   }
  //   if (validatePassword(password)) {
  //     Alert.alert(
  //       'Invalid Password',
  //       'Password must be at least 8 characters long and contain at least 1 uppercase letter and 1 number.'
  //     );
  //     return;
  //   }
  //   if (validateEmail(email) && !validatePassword(password)) {
  //     auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then((res) => {
  //         console.log(res);
  //         Alert.alert('User account logged in successfully!');
  //         dispatch(login(res))
  //         storeData(res)
  //         navigation.replace('Home')
  //       })
  //       .catch(error => {
  //         if (error.code === 'auth/email-already-in-use') {
  //           Alert.alert('That email address is already in use!');
  //         }

  //         if (error.code === 'auth/invalid-email') {
  //           Alert.alert('That email address is invalid!');
  //         }
  //         console.error(error);
  //       });
  //   }

  //   // Perform signup logic here
  //   // ...

  //   // Clear input fields after successful signup


  //   // Show success message

  //   setEmail('');
  //   setPassword('');


  // };

  const handleSignIn = () => {
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
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            console.log(res);
            Alert.alert('User account logged in successfully!');
            dispatch(login(res))
            storeData(res)
            navigation.replace('Home')
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
            }

            if (error.code === 'auth/wrong-password') {
              Alert.alert('That password is invalid!');
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
    return passwordRegex.test(password) ? true : false;
  };
  const [ischecked, setIschecked] = useState(false)
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

      <Text>By logging in, I accept the terms & conditions of the platform</Text>

      <CheckBox checked={(e) => setIschecked(e)} />

      <Button title="SignIn" onPress={() => handleSignIn()} disabled={ischecked} />
    </View>
  );
};

