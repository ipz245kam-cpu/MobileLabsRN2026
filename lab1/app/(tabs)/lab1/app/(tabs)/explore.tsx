import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns - 12;
const photos = Array.from({ length: 10 }, (_, i) => i.toString());

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {photos.map((item) => (
          <View key={item} style={[styles.photo, { width: size, height: size }]} />
        ))}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerLine} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, gap: 8 },
  photo: { backgroundColor: '#f0f0f0', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  footerContainer: { alignItems: 'center', padding: 16 },
  footerLine: { height: 1, width: '80%', backgroundColor: '#ccc' },
});
