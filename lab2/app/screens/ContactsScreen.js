import React from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';

const contacts = [
  {
    title: 'Викладачі',
    data: [
      { id: '1', name: 'Іваненко Іван Іванович', phone: '+380501234567' },
      { id: '2', name: 'Петренко Петро Петрович', phone: '+380671234567' },
      { id: '3', name: 'Сидоренко Сидір Сидорович', phone: '+380631234567' },
    ],
  },
  {
    title: 'Студенти',
    data: [
      { id: '4', name: 'Коваленко Олена', phone: '+380501111111' },
      { id: '5', name: 'Бойко Андрій', phone: '+380672222222' },
      { id: '6', name: 'Мельник Юлія', phone: '+380633333333' },
      { id: '7', name: 'Шевченко Дмитро', phone: '+380504444444' },
    ],
  },
  {
    title: 'Адміністрація',
    data: [
      { id: '8', name: 'Директор Василь Васильович', phone: '+380505555555' },
      { id: '9', name: 'Секретар Ніна Миколаївна', phone: '+380676666666' },
    ],
  },
];

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: 10, color: '#2196F3' },
  item: { padding: 12, backgroundColor: '#fff' },
  name: { fontSize: 15, fontWeight: '500' },
  phone: { fontSize: 13, color: '#888', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 12 },
});
