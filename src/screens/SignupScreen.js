import React, { useContext, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import styles from '../screenStyles';
import { isEmail } from '../utils/validators';

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setError('');
    if (!name || !email || !password) return setError('All fields are required.');
    if (!isEmail(email)) return setError('Invalid email format.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    try {
      setLoading(true);
      await signup({ name, email, password });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextField label="Name" placeholder="Jane Doe" value={name} onChangeText={setName} autoCapitalize="words" />
      <TextField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" />
      <TextField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry autoComplete="password-new" />
      {loading ? <ActivityIndicator /> : <PrimaryButton title="Signup" onPress={onSignup} />}
      <View style={styles.linkRow}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Go to Login</Text>
        </Pressable>
      </View>
    </View>
  );
}