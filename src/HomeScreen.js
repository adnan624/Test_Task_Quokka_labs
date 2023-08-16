import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {

    const signout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'),
                AsyncStorage.clear(),
                navigation.replace('InitialScreen')
            );
    }


    const state = useSelector(state => state)
    let email = state.auth.loginState.user.providerData
    console.log('authhhhh', email[0]['email']);
    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={{ alignSelf: 'center', color: 'black', fontSize: 20 }}>Welcome to the Home Screen!</Text>
            <Text style={{ alignSelf: 'center', color: 'brown', fontSize: 20 }}>
                {email[0]['email']}
            </Text>
            <View style={{ marginTop: 50 }}>
                <Button title="Logout" onPress={() => signout()} />
            </View>

        </View>
    );
};

export default HomeScreen;
