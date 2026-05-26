import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../../store/cart/cartSlice";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Кошик порожній</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Кошик</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price * item.quantity} грн</Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decreaseQuantity(item.id))}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(increaseQuantity(item.id))}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => dispatch(removeFromCart(item.id))}>
                <Text style={styles.deleteText}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Разом: {total} грн</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/checkout")}>
          <Text style={styles.btnText}>Оформити замовлення</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 60 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#888" },
  title: { fontSize: 24, fontWeight: "700", paddingHorizontal: 16, marginBottom: 16 },
  card: { backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12, borderRadius: 12, padding: 16, elevation: 2 },
  info: { marginBottom: 8 },
  name: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "700", color: "#4F46E5" },
  controls: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { backgroundColor: "#f0f0f0", borderRadius: 8, width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  qtyText: { fontSize: 18, fontWeight: "600" },
  qty: { marginHorizontal: 16, fontSize: 16, fontWeight: "600" },
  deleteBtn: { marginLeft: "auto" },
  deleteText: { fontSize: 20 },
  footer: { padding: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#eee" },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  btn: { backgroundColor: "#4F46E5", borderRadius: 12, padding: 16, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});