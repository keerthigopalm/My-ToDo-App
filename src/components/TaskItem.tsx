// src/components/TaskItem.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Task } from '../types/task';
import { useTaskStore } from '../store/taskStore';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editAbout, setEditAbout] = useState(task.about || '');
  
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const tasks = useTaskStore((state) => state.tasks);
  
  // Format date for display
  const formattedDate = new Date(task.createdAt).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  // Add an editTask function to the store
  const editTask = (id: string, newTitle: string, newAbout: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === id ? {...t, title: newTitle, about: newAbout} : t
    );
    
    useTaskStore.setState({ tasks: updatedTasks });
    // Save to AsyncStorage
    const TASKS_STORAGE_KEY = '@todo_tasks';
    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      editTask(task.id, editTitle, editAbout);
      setEditModalVisible(false);
    }
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTask(task.id), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleTask(task.id)}
      >
        <View style={[
          styles.checkbox,
          task.completed && styles.checkboxChecked
        ]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={[
          styles.title,
          task.completed && styles.completedText
        ]}>
          {task.title}
        </Text>
        
        {task.about ? (
          <Text style={[
            styles.about,
            task.completed && styles.completedText
          ]}>
            {task.about}
          </Text>
        ) : null}
        
        <Text style={styles.timestamp}>{formattedDate}</Text>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            setEditTitle(task.title);
            setEditAbout(task.about || '');
            setEditModalVisible(true);
          }}
        >
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeletePress}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            
            <TextInput
              style={styles.modalInput}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Title..."
              placeholderTextColor="#666666"
            />
            
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              value={editAbout}
              onChangeText={setEditAbout}
              placeholder="About..."
              placeholderTextColor="#666666"
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleEditSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  checkboxContainer: {
    marginRight: 10,
    paddingTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF9500',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF9500',
  },
  checkmark: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 4,
  },
  about: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#777777',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#FF9500',
    fontSize: 18,
  },
  deleteText: {
    color: '#FF9500',
    fontSize: 18,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#121212',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF9500',
    padding: 12,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  modalTextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#333333',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default TaskItem;