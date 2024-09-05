import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FIREBASE_AUTH } from './FirebaseConfig';
import CustomDrawer from './app/components/CustomDrawer';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Signup from './app/screens/Signup'; 
import Settings from './app/screens/Settings';
import Profile from './app/screens/Profile';
import VisaRequirements from './app/screens/VisaRequirements';
import Security from './app/screens/Security';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
        await AsyncStorage.setItem('userId', user.uid); // Store user ID in AsyncStorage
      } else {
        setUser(null);
        await AsyncStorage.removeItem('userId') // Remove user ID from AsyncStorage
      }
    });

    return unsubscribe; // Correctly return the unsubscribe function
  }, [])

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings Page" component={Settings} options={{ headerShown: false }} /> 
      <SettingsStack.Screen name="Security" component={Security} options={{ headerShown: true }} />
    </SettingsStack.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Drawer.Navigator 

      drawerContent={props => <CustomDrawer {...props} />}
      
      screenOptions={{
        drawerPosition: 'right',
        drawerLabelStyle: {
          marginLeft: -25, 
          fontSize: 15
        },
      }} 
      initialRouteName='Home'
      >
      
      <Drawer.Screen name='Home' component={Home} options={{ 
        headerShown: false, 
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        )
      }} />

      <Drawer.Screen name='Profile' component={Profile} options={{
        headerShown: false,
        drawerIcon: ({ color }) => (
          <Ionicons name="person-circle-outline" size={22} color={color} />
        )
      }}/>

      <Drawer.Screen name='Visa Recommendation' component={VisaRequirements} options={{ 
        headerShown: false, 
        drawerIcon: ({ color }) => (
          <Ionicons name="airplane-outline" size={22} color={color} />
        )
      }} />

      <Drawer.Screen name='Settings' component={SettingsStackScreen} options={{
        //drawerLabel: 'Settings',
        headerShown: false,
        drawerIcon: ({ color }) => (
          <Ionicons name="settings-outline" size={22} color={color} />
        )
      }}/>

    </Drawer.Navigator>
  );
}

function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
