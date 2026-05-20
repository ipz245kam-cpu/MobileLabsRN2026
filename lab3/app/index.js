import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GameScreen from '../screens/GameScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('Game');
  const [score, setScore] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [panDone, setPanDone] = useState(false);
  const [flingRightCount, setFlingRightCount] = useState(0);
  const [flingLeftCount, setFlingLeftCount] = useState(0);
  const [pinchDone, setPinchDone] = useState(false);

  const onReset = () => {
    setScore(0); setTapCount(0); setDoubleTapCount(0);
    setLongPressCount(0); setPanDone(false);
    setFlingRightCount(0); setFlingLeftCount(0); setPinchDone(false);
  };

  const renderScreen = () => {
    if (activeTab === 'Game') return (
      <GameScreen score={score} setScore={setScore}
        setTapCount={setTapCount} setDoubleTapCount={setDoubleTapCount}
        setLongPressCount={setLongPressCount} setPanDone={setPanDone}
        setFlingRightCount={setFlingRightCount} setFlingLeftCount={setFlingLeftCount}
        setPinchDone={setPinchDone} />
    );
    if (activeTab === 'Challenges') return (
      <ChallengesScreen score={score} tapCount={tapCount}
        doubleTapCount={doubleTapCount} longPressCount={longPressCount}
        panDone={panDone} flingRightCount={flingRightCount}
        flingLeftCount={flingLeftCount} pinchDone={pinchDone} />
    );
    return (
      <SettingsScreen score={score} tapCount={tapCount}
        doubleTapCount={doubleTapCount} longPressCount={longPressCount}
        panDone={panDone} flingRightCount={flingRightCount}
        flingLeftCount={flingLeftCount} pinchDone={pinchDone}
        onReset={onReset} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Game')}>
          <Text style={styles.tabIcon}>🎮</Text>
          <Text style={[styles.tabText, activeTab === 'Game' && styles.active]}>Гра</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Challenges')}>
          <Text style={styles.tabIcon}>📋</Text>
          <Text style={[styles.tabText, activeTab === 'Challenges' && styles.active]}>Завдання</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Settings')}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={[styles.tabText, activeTab === 'Settings' && styles.active]}>Налаштування</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabIcon: { fontSize: 22 },
  tabText: { fontSize: 12, color: '#888' },
  active: { color: '#2196F3', fontWeight: 'bold' },
});
