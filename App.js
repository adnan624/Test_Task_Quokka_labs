import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen.js'
import { LoginScreen } from './src/LoginForm.js'
import { SignupScreen } from './src/SignupForm.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from './src/SettingScreen.js';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './src/redux/actions.js';


const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <View style={{ flex: 1, justifyContent: "flex-end" }} >

    <Text style={{ paddingVertical: 20, color: 'black', fontSize: 25, alignSelf: 'center' }}>
      Version  1.0.0
    </Text>
  </View>}>
    <Drawer.Screen name='Home' component={HomeScreen} />
    <Drawer.Screen name='Setting' component={SettingScreen} />
  </Drawer.Navigator>
);

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const InitialScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    React.useEffect(() => {
      const Get = async () => {
        let dar = await AsyncStorage.getItem("LOGIN")
        if (dar) {
          console.log(dar);
          dispatch(login(JSON.parse(dar)))
          navigation.replace('Home')
        }
      }
      Get()
    }, [])
    return (
      <View style={styles.container}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignupScreen')} />
        <View style={{ marginTop: 10 }}>
          <Button title="Sign In" onPress={() => navigation.navigate('LoginScreen')} />
        </View>

      </View>
    )
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"InitialScreen"}>
          <Stack.Screen name="Home" component={DrawerNavigator} options={{
            headerShown: false
          }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          {/* <Stack.Screen name="Dashboard" component={DrawerNavigator} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
