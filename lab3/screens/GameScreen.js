import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

export default function GameScreen({
  score, setScore,
  setTapCount, setDoubleTapCount, setLongPressCount,
  setPanDone, setFlingRightCount, setFlingLeftCount, setPinchDone
}) {
  const [scale, setScale] = useState(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const baseScale = useRef(1);
  const doubleTapRef = useRef(null);

  const onSingleTap = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScore(s => s + 1);
      setTapCount(t => t + 1);
    }
  };

  const onDoubleTap = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScore(s => s + 2);
      setDoubleTapCount(t => t + 1);
    }
  };

  const onLongPress = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScore(s => s + 5);
      setLongPressCount(t => t + 1);
    }
  };

  const onPan = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      translateX.setValue(e.nativeEvent.translationX);
      translateY.setValue(e.nativeEvent.translationY);
      setPanDone(true);
    }
  };

  const onFlingRight = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScore(s => s + Math.floor(Math.random() * 10) + 1);
      setFlingRightCount(t => t + 1);
    }
  };

  const onFlingLeft = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScore(s => s + Math.floor(Math.random() * 10) + 1);
      setFlingLeftCount(t => t + 1);
    }
  };

  const onPinch = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      setScale(baseScale.current * e.nativeEvent.scale);
    }
    if (e.nativeEvent.state === State.END) {
      baseScale.current = baseScale.current * e.nativeEvent.scale;
      setScore(s => s + 3);
      setPinchDone(true);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.scoreLabel}>SCORE</Text>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.hints}>
        <Text style={styles.hint}>👆 Tap: +1 point</Text>
        <Text style={styles.hint}>👆👆 Double-tap: +2 points</Text>
        <Text style={styles.hint}>⏱ Long-press (3s): +5 points</Text>
        <Text style={styles.hint}>↔ Swipe: +1-10 random points</Text>
        <Text style={styles.hint}>🔍 Pinch: +3 points</Text>
      </View>
      <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={onFlingRight}>
        <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={onFlingLeft}>
          <PinchGestureHandler onHandlerStateChange={onPinch}>
            <Animated.View>
              <PanGestureHandler onHandlerStateChange={onPan}>
                <Animated.View>
                  <LongPressGestureHandler minDurationMs={3000} onHandlerStateChange={onLongPress}>
                    <Animated.View>
                      <TapGestureHandler waitFor={doubleTapRef} onHandlerStateChange={onSingleTap}>
                        <Animated.View>
                          <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} onHandlerStateChange={onDoubleTap}>
                            <Animated.View style={[styles.clicker, { transform: [{ translateX }, { translateY }, { scale }] }]}>
                              <Text style={styles.clickerText}>TAP ME</Text>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </TapGestureHandler>
                    </Animated.View>
                  </LongPressGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  scoreLabel: { fontSize: 14, color: '#888', letterSpacing: 2 },
  score: { fontSize: 72, fontWeight: 'bold', color: '#222', marginBottom: 20 },
  clicker: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center' },
  clickerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  hints: { marginBottom: 30 },
  hint: { fontSize: 13, color: '#555', marginVertical: 3 },
});
