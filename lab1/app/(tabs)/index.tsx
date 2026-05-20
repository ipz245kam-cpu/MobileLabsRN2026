import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const news = [
  { id: '1', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '2', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '3', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '4', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '5', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '6', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '7', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
  { id: '8', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Новини</Text>
      {news.map((item) => (
        <View key={item.id} style={styles.newsItem}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.image}
          />
          <View style={styles.textBlock}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDate}>{item.date}</Text>
            <Text style={styles.newsText}>{item.text}</Text>
          </View>
        </View>
      ))}
      <Text style={styles.footer}>Прізвище Ім'я По-батькові, група</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  newsItem: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  image: { width: 70, height: 70, backgroundColor: '#ccc', marginRight: 12 },
  textBlock: { flex: 1 },
  newsTitle: { fontSize: 16, fontWeight: 'bold' },
  newsDate: { fontSize: 12, color: '#888', marginVertical: 2 },
  newsText: { fontSize: 13, color: '#444' },
  footer: { textAlign: 'center', color: '#888', fontStyle: 'italic', padding: 16 },
});
