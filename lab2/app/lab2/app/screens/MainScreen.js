import React, { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const generateNews = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: String(start + i),
    title: `Заголовок новини ${start + i}`,
    description: `Короткий опис новини номер ${start + i}. Це тестові дані для демонстрації FlatList.`,
    image: `https://picsum.photos/seed/${start + i}/80/80`,
  }));

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(generateNews(1, 15));
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNews(1, 15));
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setNews((prev) => [...prev, ...generateNews(prev.length + 1, 10)]);
      setLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      ListHeaderComponent={<Text style={styles.header}>Новини</Text>}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2196F3" /> : null}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', padding: 16 },
  item: { flexDirection: 'row', padding: 12 },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#ccc' },
  textBlock: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  desc: { fontSize: 13, color: '#555' },
  separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 12 },
});
