import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ChallengesScreen({ score, tapCount, doubleTapCount, longPressCount, panDone, flingRightCount, flingLeftCount, pinchDone }) {
  const challenges = [
    { id: '1', icon: '👆', title: 'Зробити 10 кліків', desc: 'Натисни на об\'єкт 10 разів', current: tapCount || 0, max: 10, done: (tapCount || 0) >= 10 },
    { id: '2', icon: '👆👆', title: 'Подвійний клік 5 разів', desc: 'Зроби 5 подвійних кліків', current: doubleTapCount || 0, max: 5, done: (doubleTapCount || 0) >= 5 },
    { id: '3', icon: '⏱', title: 'Утримувати 3 секунди', desc: 'Утримуй об\'єкт 3 секунди', current: (longPressCount || 0) >= 1 ? 1 : 0, max: 1, done: (longPressCount || 0) >= 1 },
    { id: '4', icon: '🔄', title: 'Перетягнути об\'єкт', desc: 'Перемісти об\'єкт по екрану', current: panDone ? 1 : 0, max: 1, done: panDone },
    { id: '5', icon: '👉', title: 'Свайп вправо', desc: 'Зроби швидкий свайп вправо', current: (flingRightCount || 0) >= 1 ? 1 : 0, max: 1, done: (flingRightCount || 0) >= 1 },
    { id: '6', icon: '👈', title: 'Свайп вліво', desc: 'Зроби швидкий свайп вліво', current: (flingLeftCount || 0) >= 1 ? 1 : 0, max: 1, done: (flingLeftCount || 0) >= 1 },
    { id: '7', icon: '🔍', title: 'Змінити розмір об\'єкта', desc: 'Використай pinch жест', current: pinchDone ? 1 : 0, max: 1, done: pinchDone },
    { id: '8', icon: '🏆', title: 'Отримати 100 очок', desc: 'Набери 100 очок у лічильнику', current: Math.min(score || 0, 100), max: 100, done: (score || 0) >= 100 },
    { id: '9', icon: '⚡', title: 'Набрати 50 очок', desc: 'Власне завдання — набери 50 очок', current: Math.min(score || 0, 50), max: 50, done: (score || 0) >= 50 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Завдання</Text>
      {challenges.map((c) => (
        <View key={c.id} style={styles.item}>
          <Text style={styles.icon}>{c.icon}</Text>
          <View style={styles.info}>
            <Text style={styles.title}>{c.title}</Text>
            <Text style={styles.desc}>{c.desc}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((c.current / c.max) * 100, 100)}%` }]} />
            </View>
            <Text style={styles.progress}>{c.current}/{c.max}</Text>
          </View>
          <Text style={styles.status}>{c.done ? '✅' : '⭕'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  icon: { fontSize: 24, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: 'bold' },
  desc: { fontSize: 12, color: '#888', marginTop: 2 },
  progressBar: { height: 4, backgroundColor: '#eee', borderRadius: 2, marginTop: 6 },
  progressFill: { height: 4, backgroundColor: '#2196
