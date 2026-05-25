import { Link, router } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const products = [
  { id: '1', name: 'iPhone 15', price: 999, image: 'https://picsum.photos/seed/1/200/200', description: 'Новий iPhone 15 з покращеною камерою та процесором A16.' },
  { id: '2', name: 'MacBook Pro', price: 1999, image: 'https://picsum.photos/seed/2/200/200', description: 'Потужний ноутбук для професіоналів з чипом M3.' },
  { id: '3', name: 'AirPods Pro', price: 249, image: 'https://picsum.photos/seed/3/200/200', description: 'Навушники з активним шумопоглинанням.' },
  { id: '4', name: 'iPad Air', price: 599, image: 'https://picsum.photos/seed/4/200/200', description: 'Легкий та потужний планшет для роботи і навчання.' },
  { id: '5', name: 'Apple Watch', price: 399, image: 'https://picsum.photos/seed/5/200/200', description: 'Розумний годинник з моніторингом здоров\'я.' },
  { id: '6', name: 'iMac', price: 1299, image: 'https://picsum.photos/seed/6/200/200', description: 'Стильний настільний комп\'ютер з дисплеєм Retina.' },
];

export { products };

export default function CatalogScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const renderItem = ({ item }) => (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Каталог товарів</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Вийти</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  logout: { color: '#f44336', fontSize: 16 },
  row: { justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, width: '48%', overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 140 },
  info: { padding: 10 },
  name: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  price: { fontSize: 14, color: '#2196F3' },
});
