import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

// Custom Drawer Component
const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            {/* Drawer content */}
            <DrawerContentScrollView 
                {...props} 
                contentContainerStyle={styles.drawerContentScrollView}
            >
                <View style={styles.drawerItemListContainer}>
                    {/* Items like Home, Settings, etc. */}
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            
            {/* Sign Out Button */}
            <View style={styles.signOutButtonContainer}>
                <TouchableOpacity 
                    onPress={() => FIREBASE_AUTH.signOut()} 
                    style={styles.signOutButton}
                >
                    <View style={styles.signOutButtonTextContainer}>
                        <Ionicons name='exit-outline' size={22} color="#225475" />
                        <Text style={styles.signOutButtonText}>Sign Out</Text>  
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContentScrollView: {
        backgroundColor: '#225475',
    },
    drawerItemListContainer: {
        flex: 1, 
        backgroundColor: '#fff', 
        paddingTop: 10,
    },
    signOutButtonContainer: {
        padding: 20, 
        borderTopWidth: 1, 
        borderTopColor: '#ccc',
    },
    signOutButton: {
        paddingVertical: 15,
    },
    signOutButtonTextContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    signOutButtonText: {
        fontSize: 15,
        marginLeft: 10, // Added to give some space after the icon
    },
});

export default CustomDrawer;
