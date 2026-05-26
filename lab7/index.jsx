import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";

export default function CatalogScreen() {
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог товарів</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>{item.price} грн</Text>
              <TouchableOpacity style={styles.btn} onPress={() => dispatch(addToCart(item))}>
                <Text style={styles.btnText}>Додати до кошика</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "700", paddingHorizontal: 16, marginBottom: 16 },
  card: { flexDirection: "row", backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12, borderRadius: 12, overflow: "hidden", elevation: 2 },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  name: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  desc: { fontSize: 12, color: "#888", marginBottom: 4 },
  price: { fontSize: 16, fontWeight: "700", color: "#4F46E5", marginBottom: 8 },
  btn: { backgroundColor: "#4F46E5", borderRadius: 8, padding: 8, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 13, fontWeight: "600" },
});