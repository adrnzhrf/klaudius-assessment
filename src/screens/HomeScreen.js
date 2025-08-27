import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import styles from '../screenStyles';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={{ marginBottom: 8 }}>Name: <Text style={{ fontWeight: '700' }}>{user?.name}</Text></Text>
      <Text style={{ marginBottom: 24 }}>Email: <Text style={{ fontWeight: '700' }}>{user?.email}</Text></Text>
      <PrimaryButton title="Logout" onPress={logout} />
    </View>
  );
}