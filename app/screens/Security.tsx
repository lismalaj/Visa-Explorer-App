import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateNewPassword = () => {
    if (newPassword.length === 0) {
      setError("New password cannot be empty.");
      return false;
    } else if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return false;
    } else if (newPassword.length < 8) { // Example: Ensure password is at least 8 characters long
      setError("New password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handlePasswordChange = async () => {
    if (!validateNewPassword()) {
      Alert.alert("Error", error);
      return;
    }

    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error updating password:', error);
      setError(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={(text) => {
          setNewPassword(text);
          //setError(''); // Clear error when user starts typing
        }}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          //setError(''); // Clear error when user starts typing
        }}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Change Password" onPress={handlePasswordChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Security;
