import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, variant='primary' }) {
  return (
    <Pressable onPress={onPress} style={[styles.btn, variant === 'secondary' && styles.secondary]}>
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2F80ED', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginVertical: 6 },
  text: { color: '#fff', fontWeight: '700' },
  secondary: { backgroundColor: '#ECF2FF' },
  textSecondary: { color: '#2F80ED' },
});