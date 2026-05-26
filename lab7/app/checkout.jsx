import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cart/cartSlice";
import { addOrder } from "../store/orders/ordersSlice";
import { setUserData } from "../store/users/usersSlice";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = () => {
    if (!name || !email || !phone || !address) {
      Alert.alert("Помилка", "Заповніть усі поля!");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Помилка", "Введіть коректний email!");
      return;
    }
    if (phone.length < 10) {
      Alert.alert("Помилка", "Введіть коректний номер телефону!");
      return;
    }

    dispatch(setUserData({ name, email, phone, address }));

    const order = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("uk-UA"),
      name,
      email,
      phone,
      address,
      items,
      total,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    Alert.alert("Успішно! 🎉", "Ваше замовлення оформлено!", [
      { text: "OK", onPress: () => router.replace("/(tabs)/orders") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Оформлення замовлення</Text>
      <Text style={styles.label}>ПІБ</Text>
      <TextInput style={styles.input} placeholder="Іваненко Іван Іванович"
        value={name} onChangeText={setName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="email@example.com"
        value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Text style={styles.label}>Телефон</Text>
      <TextInput style={styles.input} placeholder="+380991234567"
        value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>Адреса</Text>
      <TextInput style={styles.input} placeholder="м. Київ, вул. Хрещатик, 1"
        value={address} onChangeText={setAddress} />
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Сума замовлення: {total} грн</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Підтвердити замовлення</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Повернутись до кошика</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 60, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6 },
  input: { backgroundColor: "#fff", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e0e0e0" },
  totalBox: { backgroundColor: "#fff", borderRadius: 10, padding: 16, marginBottom: 16 },
  totalText: { fontSize: 18, fontWeight: "700", color: "#4F46E5" },
  btn: { backgroundColor: "#4F46E5", borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 12 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  backBtn: { borderWidth: 1, borderColor: "#4F46E5", borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 40 },
  backText: { color: "#4F46E5", fontSize: 16, fontWeight: "600" },
});