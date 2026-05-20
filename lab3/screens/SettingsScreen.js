import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ score, tapCount, doubleTapCount, longPressCount, panDone, flingRightCount, flingLeftCount, pinchDone, onReset }) {
  const completed = [
    (tapCount || 0) >= 10,
    (doubleTapCount || 0) >= 5,
    (longPressCount || 0) >= 1,
    panDone,
    (flingRightCount || 0) >= 1,
    (flingLeftCount || 0) >= 1,
    pinchDone,
    (score || 0) >= 100,
    (score || 0) >= 50,
  ].filter(Boolean).length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Налаштування</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Статистика</Text>
        <Text style={styles.stat}>Поточний рахунок: <Text style={styles.value}>{score || 0}</Text></Text>
        <Text style={styles.stat}>Одиночних кліків: <Text style={styles.value}>{tapCount || 0}</Text></Text>
        <Text style={styles.stat}>Подвійних кліків: <Text style={styles.value}>{doubleTapCount || 0}</Text></Text>
        <Text style={styles.stat}>Довгих натискань: <Text style={styles.value}>{longPressCount || 0}</Text></Text>
        <Text style={styles.stat}>Свайпів вправо: <Text style={styles.value}>{flingRightCount || 0}</Text></Text>
        <Text style={styles.stat}>Свайпів вліво: <Text style={styles.value}>{flingLeftCount || 0}</Text></Text>
        <Text style={styles.stat}>Завдань виконано: <Text style={styles.value}>{completed}/9</Text></Text>
      </View>
      <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
        <Text style={styles.resetText}>🔄 Скинути прогрес</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  stat: { fontSize: 14, color: '#555', marginVertical: 4 },
  value: { fontWeight: 'bold', color: '#2196F3' },
  resetBtn: { backgroundColor: '#ff5252', borderRadius: 12, padding: 16, alignItems: 'center' },
  resetText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
