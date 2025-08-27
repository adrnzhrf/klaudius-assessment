import React, { createContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  initializing: true,
});

const AUTH_USER_KEY = 'auth_user';
const USERS_KEY = 'all_users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load auth state', e);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = async ({ email, password }) => {
    // Basic validation
    if (!email || !password) {
      throw new Error('Please enter your email and password.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Lookup user in local store (demo only)
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) {
      throw new Error('Incorrect credentials.');
    }

    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(found));
    setUser(found);
    return found;
  };

  const signup = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('Email already registered.');
    }

    const newUser = { name, email, password }; // NOTE: Do not store plaintext in production
    const updated = [...users, newUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, signup, logout, initializing }), [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}