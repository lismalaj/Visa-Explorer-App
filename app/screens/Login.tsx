import { View, Text, StyleSheet, ActivityIndicator, Button, Animated, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';

// Image
// @ts-ignore
import logoImage from '../../assets/multinationalLogo.png';
import DismissKeyboard from '../components/DismissKeyboard';

interface RouteProp {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouteProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;
  /* Logo Animation */
  const logoOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    /*Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();
}, []);*/
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 7000,  // Load in
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,  // Load out
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [logoOpacity]);


  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const navigateToSignup = () => {
    navigation.navigate('Signup'); 
  }

  return (
    <DismissKeyboard>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.logoContainer}>
              <Animated.Image source={logoImage} style={[styles.logo, { opacity: logoOpacity }]} />
            </View>

            <Text style={styles.regText}>Become a Multinational today!</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder='Password'
              autoCapitalize='none'
              onChangeText={(text) => setPassword(text)}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {loading ?
              <ActivityIndicator
                size='large'
                color='#0000ff'
              />
              : <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={signIn}>
                  <Text style={styles.altButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={navigateToSignup}>
                  <Text style={styles.altButtonText}>Create account</Text>
                </TouchableOpacity>
              </View>}
          </KeyboardAvoidingView>
        </View>
      </GestureHandlerRootView>
    </DismissKeyboard>
  );

};

export default Login

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  header: {
    backgroundColor: '#1b2c56',
    padding: 30,
    alignItems: 'center',
    marginTop: 30,
    //fontStyle: 'bold',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold', 
  },  
  regText:{
    color: '#3d785b',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#1b2c56',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    paddingTop: 15,
    //backgroundColor: "#225475",
    //justifyContent: 'center',
  },
  button: {
    //backgroundColor: '#1E90FF', 
    padding: 15,
    //paddingTop: 10,
    paddingHorizontal: 141,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15, // This creates space between the buttons
  },
  loginButton: {
    backgroundColor: '#3d785b',
    /*shadowColor: 'black',
    shadowOffset: { width: -1, height: 1},
    shadowRadius: 1,
    elevation: 10, */
  },
  signupButton: {
    backgroundColor: '#1b2c56',
    /*shadowColor: 'black',
    shadowOffset: { width: -1, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.8,*/
    elevation: 10,
    paddingHorizontal: 104,
    padding: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 25,
  },
  altButtonText: {
    color: '#ffffff',
    fontSize: 17,
    //fontWeight: 'bold',
    //textShadowColor: 'black',
    //textShadowOffset: { width: -1, height: 1 },
    //textShadowRadius: 1,
  },
  // Image
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
    //marginTop: 20, // Add some space at the top
    marginHorizontal: 15,
  },
  logo: {
    width: 280,
    height: 160,
    resizeMode: 'contain', // Logo scaling
    //borderWidth: 20,
    //borderRadius:5,
    //padding:50,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    //marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
