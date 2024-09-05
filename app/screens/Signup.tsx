import React, { useState, ReactNode } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { NavigationProp } from '@react-navigation/native';
import { doc, collection, setDoc, getDocs, addDoc } from 'firebase/firestore';
import DismissKeyboard from '../components/DismissKeyboard';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';

interface RouteProp {
  navigation: NavigationProp<any, any>;
}


const Signup = ({ navigation }: RouteProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !name || !dob || !country) {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // User data to be stored in Firestore
      const userData = {
        email: user.email,
        name: name,
        DOB: dob,
        country: country,
      };

      // Add user data to Firestore
      //await addDoc(collection(db, 'users'), userData);
      
      
      /* Signup is already creating so it doesn't
      need to check for empty collections 
      if the uid is unique, it's unnecessary 
      const usersRef = collection(db, 'users');
      const userDocRef = doc(usersRef, user.uid);
      const usersSnapshot = await getDocs(usersRef);

      if (usersSnapshot.empty) {
          // 'users' folder doesn't exist, create it first
          await setDoc(doc(usersRef, user.uid), userData);
      } else {
          // 'users' folder exists, add user data to the user's folder
          await setDoc(userDocRef, userData);
      }*/

      await setDoc(doc(db, 'users', user.uid), userData);
      //setLoading(false);
      //navigation.navigate('Home');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    const today = new Date();
    if (date > today) {
      setError('Date of Birth cannot be in the future');
    } else {
      setError('')
      setDob(date.toDateString());
      hideDatePicker();
    }
  };


  return (
    <DismissKeyboard>
      <View style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')} activeOpacity={0.2}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.regText}>Sign Up!</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <TouchableOpacity style={styles.input} onPress={() => showDatePicker()}>
          <Text style={[styles.inputText, !dob && styles.placeholderText]}>
            {dob ? dob: 'Date of Birth'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          themeVariant='light'
        />

        <CountryCodeDropdownPicker
          selected={country}
          setSelected={setCountry}
          countryCodeContainerStyles={styles.countryCodeContainerStyles} 
          //countryCodeTextStyles={styles.countryCodeTextStyles}
          dropdownStyles={styles.dropdownStyles}
          dropdownTextStyles={styles.dropdownTextStyles}
          searchTextStyles = {styles.searchTextStyles}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignup}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        
      </View>
    </DismissKeyboard>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    
  },

  regText: {
    color:'#1b2c56',
    fontWeight: 'bold',
    fontSize: 35,
    fontStyle: 'italic',
    marginBottom: 10,
    },

  input: {
    width: '100%',
    height: 48,
    borderWidth: 2,
    borderColor: '#1b2c56',
    borderRadius: 5,
    //marginBottom: 16,
    marginVertical: 5,
    paddingHorizontal: 16,
    fontSize: 17,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  inputText: {
    fontSize: 15,
    paddingTop: 12,
    //textAlign: 'center',
  },
  placeholderText: {
    color: '#ccc', 
    paddingTop: 12,
    //fontSize: 15,
    //textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    //backgroundColor: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#3d785b',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    //fontWeight: 'bold',
    color: '#ffffff',
  },
  signUpButton: {
    backgroundColor: '#1b2c56',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 135,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 65,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  // You can add styles to the dropdown
  
  countryCodeContainerStyles: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#3d785b',
  },
  searchTextStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  /*countryCodeTextStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red'
  },*/
  dropdownStyles: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#cc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    elevation: 20,
    marginVertical: 10,
  },
  dropdownTextStyles: {
    fontSize: 16,
    color: '#333',
  },
});
