import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useTaskStore } from './store/taskStore';

const App = () => {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.header}>My To-Do List</Text>
        <TaskInput />
        <TaskList />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#FF9500',
  },
});

export default App;
