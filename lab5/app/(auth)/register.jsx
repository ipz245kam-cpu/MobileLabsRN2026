import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    register(email, password, name);
    router.replace('/(app)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.label}>Підтвердження паролю</Text>
      <TextInput style={styles.input} value={confirm} onChangeText={setConfirm} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Вже є акаунт? Увійти
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 14, color: '#333', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#2196F3', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: '#2196F3', fontSize: 14 },
});
