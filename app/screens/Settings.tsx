import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

interface RouteProp {
  navigation: NavigationProp<any, any>;
}

const SettingsScreen = ({ navigation }: RouteProp) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
        <TouchableRipple
          style={styles.iconButton}
          onPress={() => navigation.openDrawer()}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={true} // Enhances the ripple effect on iOS and overflow for Android
        >
          <Ionicons name="menu-outline" size={30} color="#333" />
        </TouchableRipple>
      </View>
      <View style={styles.settingsOptions}>
        {/*<SettingsOption
          title="Personal Details"
          onPress={() => navigation.navigate('PersonalDetails')}
          iconName="chevron-forward-outline"
        />8/*/}
        <SettingsOption
          title="Password & Security"
          onPress={() => navigation.navigate('Security')}
          iconName="chevron-forward-outline"
        />
        {/* Add more settings options here */}
      </View>
    </SafeAreaView>
  );
};

const SettingsOption = ({ title, onPress, iconName }) => (
  <TouchableRipple
    onPress={onPress}
    style={styles.button}
    rippleColor="rgba(0, 0, 0, .16)"
  >
    <>
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name={iconName} size={22} color="#333" />
    </>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
  },
  iconButton: {
    padding: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  settingsOptions: {
    marginTop: 30,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});

export default SettingsScreen;
