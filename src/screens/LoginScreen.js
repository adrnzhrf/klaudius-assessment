import React, { useContext, useState } from 'react';
import { View, Text, Alert, Pressable, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import styles from '../screenStyles';
import { isEmail } from '../utils/validators';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setError('');
    if (!email || !password) return setError('Please fill in both fields.');
    if (!isEmail(email)) return setError('Invalid email format.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    try {
      setLoading(true);
      await login({ email, password });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
      />
      <TextField
        label="Password"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      {loading ? <ActivityIndicator /> : <PrimaryButton title="Login" onPress={onLogin} />}
      <View style={styles.linkRow}>
        <Text>Don’t have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Go to Signup</Text>
        </Pressable>
      </View>
    </View>
  );
}