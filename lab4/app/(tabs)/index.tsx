import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ROOT = FileSystem.documentDirectory!;

export default function FileManagerScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT);
  const [items, setItems] = useState<any[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'folder' | 'file' | 'edit'>('folder');
  const [inputName, setInputName] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [detailInfo, setDetailInfo] = useState<any | null>(null);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path: string) => {
    try {
      const result = await FileSystem.readDirectoryAsync(path);
      const detailed = await Promise.all(
        result.map(async (name) => {
          const info = await FileSystem.getInfoAsync(path + name, { size: true });
          return { ...info, name };
        })
      );
      setItems(detailed);
    } catch {
      setItems([]);
    }
  };

  const navigateTo = (path: string) => {
    setHistory((prev) => [...prev, currentPath]);
    setCurrentPath(path);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentPath(prev);
  };

  const createFolder = async () => {
    if (!inputName) return;
    await FileSystem.makeDirectoryAsync(currentPath + inputName, { intermediates: true });
    setModalVisible(false);
    setInputName('');
    loadDirectory(currentPath);
  };

  const createFile = async () => {
    if (!inputName) return;
    await FileSystem.writeAsStringAsync(currentPath + inputName + '.txt', inputContent);
    setModalVisible(false);
    setInputName('');
    setInputContent('');
    loadDirectory(currentPath);
  };

  const deleteItem = (name: string) => {
    Alert.alert('Видалити', `Видалити "${name}"?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          await FileSystem.deleteAsync(currentPath + name);
          loadDirectory(currentPath);
        },
      },
    ]);
  };

  const openFile = async (name: string) => {
    const content = await FileSystem.readAsStringAsync(currentPath + name);
    setSelectedFile(name);
    setInputContent(content);
    setModalType('edit');
    setModalVisible(true);
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    await FileSystem.writeAsStringAsync(currentPath + selectedFile, inputContent);
    setModalVisible(false);
    setSelectedFile(null);
    loadDirectory(currentPath);
  };

  const showDetails = async (item: any) => {
    const info = await FileSystem.getInfoAsync(currentPath + item.name, { size: true });
    setDetailInfo({ ...info, name: item.name });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / 1048576).toFixed(1) + ' МБ';
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => item.isDirectory ? navigateTo(item.uri) : openFile(item.name)}
      onLongPress={() => showDetails(item)}
    >
      <Text style={styles.itemIcon}>{item.isDirectory ? '📁' : '📄'}</Text>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.name)}>
        <Text style={styles.deleteBtn}>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📂 Файловий менеджер</Text>
      <Text style={styles.path} numberOfLines={1}>{currentPath}</Text>

      <View style={styles.actions}>
        {history.length > 0 && (
          <TouchableOpacity style={styles.btn} onPress={goBack}>
            <Text style={styles.btnText}>⬆ Назад</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => { setModalType('folder'); setModalVisible(true); }}>
          <Text style={styles.btnText}>+ Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => { setModalType('file'); setModalVisible(true); }}>
          <Text style={styles.btnText}>+ Файл</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.uri}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Папка порожня</Text>}
      />

      {detailInfo && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>ℹ️ Інформація</Text>
          <Text>Назва: {detailInfo.name}</Text>
          <Text>Тип: {detailInfo.isDirectory ? 'Папка' : 'Файл .txt'}</Text>
          <Text>Розмір: {detailInfo.size ? formatBytes(detailInfo.size) : '—'}</Text>
          <Text>Змінено: {detailInfo.modificationTime ? new Date(detailInfo.modificationTime * 1000).toLocaleString() : '—'}</Text>
          <TouchableOpacity onPress={() => setDetailInfo(null)}>
            <Text style={styles.closeDetail}>Закрити</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {modalType === 'folder' && (
              <>
                <Text style={styles.modalTitle}>Нова папка</Text>
                <TextInput style={styles.input} placeholder="Назва папки" value={inputName} onChangeText={setInputName} />
                <TouchableOpacity style={styles.btn} onPress={createFolder}>
                  <Text style={styles.btnText}>Створити</Text>
                </TouchableOpacity>
              </>
            )}
            {modalType === 'file' && (
              <>
                <Text style={styles.modalTitle}>Новий файл</Text>
                <TextInput style={styles.input} placeholder="Назва файлу (без .txt)" value={inputName} onChangeText={setInputName} />
                <TextInput style={[styles.input, styles.textArea]} placeholder="Вміст файлу" value={inputContent} onChangeText={setInputContent} multiline />
                <TouchableOpacity style={styles.btn} onPress={createFile}>
                  <Text style={styles.btnText}>Створити</Text>
                </TouchableOpacity>
              </>
            )}
            {modalType === 'edit' && (
              <>
                <Text style={styles.modalTitle}>✏️ {selectedFile}</Text>
                <TextInput style={[styles.input, styles.textArea]} value={inputContent} onChangeText={setInputContent} multiline />
                <TouchableOpacity style={styles.btn} onPress={saveFile}>
                  <Text style={styles.btnText}>Зберегти</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Скасувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  path: { fontSize: 11, color: '#888', marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  btn: { backgroundColor: '#2196F3', padding: 8, borderRadius: 6 },
  btnText: { color: '#fff', fontSize: 13 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemIcon: { fontSize: 20, marginRight: 10 },
  itemName: { flex: 1, fontSize: 15 },
  deleteBtn: { fontSize: 18 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40 },
  detailBox: { backgroundColor: '#fff3cd', padding: 12, borderRadius: 8, marginTop: 10 },
  detailTitle: { fontWeight: 'bold', marginBottom: 6 },
  closeDetail: { color: '#2196F3', marginTop: 8, textAlign: 'right' },
  modal: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  textArea: { height: 120, textAlignVertical: 'top' },
  cancel: { textAlign: 'center', color: '#888', marginTop: 8 },
});
