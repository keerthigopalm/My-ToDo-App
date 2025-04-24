import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { useTaskStore } from '../store/taskStore';

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title.trim(), about.trim());
      setTitle('');
      setAbout('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title..."
        placeholderTextColor="#666666"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="About..."
        placeholderTextColor="#666666"
        value={about}
        onChangeText={setAbout}
        multiline
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF9500',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#1E1E1E',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
  },
  addButtonText: {
    color: '#121212',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TaskInput;
