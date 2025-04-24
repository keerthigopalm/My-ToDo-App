// import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#AAAAAA',
  },
});

export default TaskList;