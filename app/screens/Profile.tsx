import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'; 
import { Button, TextInput, Avatar, Title, Text, Caption, TouchableRipple } from 'react-native-paper'; 
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RouteProp {
    navigation: NavigationProp<any, any>;
}

const Profile = ({ navigation }: RouteProp) => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', DOB: '', country: '', photoUrl: '' });
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const userID = await AsyncStorage.getItem('userId');
            if (!userID) throw new Error('User ID not found');
                const userDocRef = doc(FIRESTORE_DB, 'users', userID);
                const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUserInfo(userDocSnap.data() as typeof userInfo);
            } else {
                throw new Error('No user data available');
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            Alert.alert("Error", "Failed to fetch user info");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);


    const handleUpdate = async () => {
        const userID = await AsyncStorage.getItem('userId');
        if (userID) {
            try {
                const userDocRef = doc(FIRESTORE_DB, 'users', userID);
                await updateDoc(userDocRef, { ...userInfo });
                Alert.alert("Update Success", "Your profile has been updated.");
            } catch (error) {
                console.error('Update failed:', error);
                Alert.alert("Update Error", "Failed to update profile.");
            }
        }
    };

    if (loading) return <ActivityIndicator animating={true} color="#0000ff" />;

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Avatar.Image source={{ uri: userInfo.photoUrl || 'default_profile_pic_url' }} size={80} style={{ alignSelf: 'center' }} />
            <View style={styles.infoContainer}>
                <Title>{userInfo.name}</Title>
                <Caption>{userInfo.email}</Caption>
            </View>



            <TextInput label="Name" value={userInfo.name} onChangeText={(text) => setUserInfo({ ...userInfo, name: text })} style={styles.input} />       
            <TextInput label="Email" value={userInfo.email} editable={false} style={styles.uneditableInput}/>
            <TextInput label="Date of Birth" value={userInfo.DOB} editable={false} style={styles.uneditableInput} />

            <CountryCodeDropdownPicker
                selected={userInfo.country}
                setSelected={(value) => setUserInfo({ ...userInfo, country: value })}
                countryCodeContainerStyles={styles.dropdownContainer}
                dropdownStyles={styles.dropdownStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                searchTextStyles={styles.searchTextStyles}
            />

            <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                Update Profile
            </Button>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.openDrawer()}>
                    <View style={styles.menuItem}>
                        <Ionicons name="exit-outline" size={25} color="#3d785b" />
                        <Text style={styles.menuItemText}>Exit Profile</Text>
                    </View>
                </TouchableRipple>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
        paddingTop: 100,
    },
    infoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 2,
    },
    uneditableInput: {
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        elevation: 2,
    },
    dropdownContainer: {
        marginVertical: 5,
    },
    dropdownStyles: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        elevation: 3,
    },
    dropdownTextStyles: {
        fontSize: 16,
    },
    searchTextStyles: {
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007bff'
    },
    menuWrapper: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItemText: {
        marginLeft: 20,
        fontSize: 16,
    },
    sidebarButton: {
        position: 'absolute',
        top: 60,
        right: 10,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        zIndex: 999,
        elevation: 20,
    },

});

export default Profile;



/*import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Ensure you have this installed
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';

// Image
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


interface UserInfo {
    photoUrl?: string;
    name?: string;
    email?: string;
    DOB?: string;
    country?: string;
}

interface RouteProp {
    navigation: NavigationProp<any, any>;
}

const Profile = ({ navigation }: RouteProp) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);//<boolean>(true);
    const [error, setError] = useState(null);//<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const fetchUserInfo = useCallback(async () => {
        setLoading(true);
        try {
            const userID = await AsyncStorage.getItem('userId');
            if (!userID) throw new Error('User ID not found');
            const userDocRef = doc(FIRESTORE_DB, 'users', userID);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUserInfo(userDocSnap.data() as UserInfo);
            } else {
                throw new Error('No user data available');
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            setError('Failed to fetch user info');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const handleUpdate = async () => {
        setLoading(true);
        const userID = await AsyncStorage.getItem('userId');
        const userDocRef = doc(FIRESTORE_DB, 'users', userID);
        try {
            await updateDoc(userDocRef, { ...userInfo });
            Alert.alert("Update Success", "Your profile has been updated.");
        } catch (error) {
            console.error('Update failed:', error);
            Alert.alert("Update Error", "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: Date) => {
        const today = new Date();
        if (date > today) {
            Alert.alert("Invalid Date", "Date of Birth cannot be in the future.");
        } else {
            setUserInfo(prevState => ({ ...prevState, DOB: date.toDateString() }));
            
        }hideDatePicker();
    };

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <View style={styles.container}><Text>Error: {error}</Text></View>;

    return (
        <View style={styles.container}>
            <Image source={{ uri: userInfo?.photoUrl || 'default_profile_pic_url' }} style={styles.profilePic} />
            <TextInput style={styles.input} value={userInfo?.name} onChangeText={(text) => setUserInfo({...userInfo, name: text})} />
            <Text style={styles.info}>Email: {userInfo?.email}</Text>
            <TouchableOpacity style={styles.inputA} onPress={showDatePicker}>
                <Text>{userInfo?.DOB || 'Set Date of Birth'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleDateChange} onCancel={hideDatePicker} />
            <CountryCodeDropdownPicker
                selected={userInfo.country}
                setSelected={(value) => setUserInfo({...userInfo, country: value})}
                countryCodeContainerStyles={styles.countryCodeContainerStyles}
                dropdownStyles={styles.dropdownStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                searchTextStyles={styles.searchTextStyles}
                //<TextInput style={styles.input} value={userInfo?.country} onChangeText={(text) => setUserInfo({...userInfo, country: text})} />
            
            />
            
            <Button title="Update Profile" onPress={handleUpdate} />
            <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu-outline" size={22} color='#1E90FF' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        padding: 30,
    },
    profilePic: {
        width: 220,
        height: 220,
        borderRadius: 60,
        marginBottom: 20,
        backgroundColor: '#dedcdc',
    },
    input: {
        width: '50%',
        padding: 1,
        //paddingHorizontal: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 17,
    },
    inputA:{
        width: '50%',
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 20,    // Added vertical margin for spacing between elements
        marginHorizontal: 10,
        //margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center', 
        fontSize: 21,
        justifyContent: 'center',
       
    },
    info: {
        fontSize: 15,
        color: '#666',
        marginBottom: 5,
    },
    sidebarButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    countryCodeContainerStyles: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        marginVertical: 10,
        //marginHorizontal: 10,
        elevation: 10,
      },
      searchTextStyles: {
        fontSize: 16,
        //fontWeight: 'bold',
      },
      countryCodeTextStyles: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'red'
      },
      dropdownStyles: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#cc',
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 20,
        elevation: 20,
      },
      dropdownTextStyles: {
        fontSize: 16,
        color: '#333',
      },
});

export default Profile;
*/