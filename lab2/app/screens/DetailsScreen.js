import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.fullText}>
          Це повний текст новини. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, backgroundColor: '#ccc' },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 15, color: '#555', marginBottom: 12 },
  fullText: { fontSize: 14, color: '#333', lineHeight: 22 },
});
