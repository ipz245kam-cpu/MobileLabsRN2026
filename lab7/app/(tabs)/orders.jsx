import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function OrdersScreen() {
  const orders = useSelector((state) => state.orders.list);

  if (orders.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Історія замовлень порожня</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія замовлень</Text>
      <FlatList
        data={[...orders].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>📅 {item.date}</Text>
            <Text style={styles.customer}>👤 {item.name}</Text>
            {item.items.map((p) => (
              <Text key={p.id} style={styles.item}>
                • {p.name} × {p.quantity} — {p.price * p.quantity} грн
              </Text>
            ))}
            <Text style={styles.total}>Разом: {item.total} грн</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 60 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#888" },
  title: { fontSize: 24, fontWeight: "700", paddingHorizontal: 16, marginBottom: 16 },
  card: { backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12, borderRadius: 12, padding: 16, elevation: 2 },
  date: { fontSize: 12, color: "#888", marginBottom: 4 },
  customer: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  item: { fontSize: 13, color: "#444", marginBottom: 2 },
  total: { fontSize: 16, fontWeight: "700", color: "#4F46E5", marginTop: 8 },
});