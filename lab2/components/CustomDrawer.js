import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>А</Text>
        </View>
        <Text style={styles.name}>Прізвище Ім'я По-батькові</Text>
        <Text style={styles.group}>Група ІПЗ-24-5</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('News')}
        >
          <Text style={styles.menuText}>📰 Новини</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('Contacts')}
        >
          <Text style={styles.menuText}>👥 Контакти</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, backgroundColor: '#2196F3', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { fontSize: 30, fontWeight: 'bold', color: '#2196F3' },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  group: { color: '#fff', fontSize: 13, marginTop: 4 },
  menu: { padding: 16 },
  menuItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuText: { fontSize: 16, color: '#333' },
});
