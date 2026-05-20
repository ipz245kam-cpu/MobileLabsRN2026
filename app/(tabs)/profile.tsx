import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} placeholder="" />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} placeholder="" secureTextEntry />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} placeholder="" secureTextEntry />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} placeholder="" />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} placeholder="" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Прізвище Ім'я По-батькові, група</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  label: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 4 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, fontSize: 16, marginBottom: 8 },
  button: { backgroundColor: '#2196F3', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', color: '#888', fontStyle: 'italic', padding: 16 },
});
