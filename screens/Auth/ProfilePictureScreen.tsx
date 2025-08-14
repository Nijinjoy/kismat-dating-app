import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfilePictureScreen = () => {
    const navigation = useNavigation();
  const [images, setImages] = useState([null, null, null, null]);
  const [activeIndex, setActiveIndex] = useState(null);

  const pickImage = async (index) => {
    setActiveIndex(index);
    
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your photos to upload profile pictures.');
      setActiveIndex(null);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
    }
    
    setActiveIndex(null);
  };

  const handleNext = () => {
    const uploadedCount = images.filter(img => img !== null).length;
    if (uploadedCount < 2) {
      Alert.alert('More Photos Needed', 'Please upload at least 2 profile images to continue.');
      return;
    }
    Alert.alert('Success!', 'Your profile pictures look great!');
navigation.navigate('Bio')
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Your Visual Profile</Text>
        <Text style={styles.subtitle}>Upload 2-4 photos to showcase your personality</Text>
      </View>
      
      <View style={styles.gridContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.gridItem}>
            <TouchableOpacity 
              style={[
                styles.imageBox, 
                activeIndex === index && styles.activeBox,
                img && styles.imageBoxFilled
              ]}
              onPress={() => pickImage(index)}
            >
              {img ? (
                <Image source={{ uri: img }} style={styles.image} />
              ) : (
                <View style={styles.addContainer}>
                  <View style={styles.addIcon}>
                    <Text style={styles.addText}>+</Text>
                  </View>
                  <Text style={styles.addLabel}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
            
            {img && (
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Photo Tips:</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Use clear, well-lit photos</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Show your face clearly</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Include different expressions</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.nextButton,
          images.filter(img => img !== null).length >= 2 && styles.nextButtonActive
        ]} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Continue to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    maxWidth: 300,
  },
  progressContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#a0aec0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#edf2f7',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 10,
  },
  progressHint: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 8,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
    position: 'relative',
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    overflow: 'hidden',
  },
  imageBoxFilled: {
    borderStyle: 'solid',
    borderColor: '#ebf4ff',
  },
  activeBox: {
    borderColor: '#667eea',
    backgroundColor: '#ebf4ff',
  },
  addContainer: {
    alignItems: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addText: {
    fontSize: 30,
    color: '#a0aec0',
    lineHeight: 44,
  },
  addLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -1,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#a0aec0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
marginTop:5
  },
  tipBullet: {
    fontSize: 16,
    color: '#667eea',
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    fontSize: 15,
    color: '#4a5568',
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#e2e8f0',
    padding: 18,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#667eea',
  },
  nextButtonText: {
    color: '#a0aec0',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProfilePictureScreen;
