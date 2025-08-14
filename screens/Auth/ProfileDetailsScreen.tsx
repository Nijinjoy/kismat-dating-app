import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const ProfileDetailsScreen = () => {
    const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('male');
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to autofill your location.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        let place = reverseGeocode[0];
        setLocation(`${place.city || place.subregion}, ${place.country}`);
      }
    })();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const handleNext = () => {
    setShowAgeModal(true);
  };

  const handleConfirm = () => {
    setShowAgeModal(false);
    Alert.alert('Confirmed', 'Age confirmed!');
    navigation.navigate("ProfilePicture")
  };

  const handleCancel = () => {
    setShowAgeModal(false);
  };

  const age = Math.floor((new Date() - dateOfBirth) / (1000 * 60 * 60 * 24 * 365));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <MaterialIcons name="person-outline" size={40} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>Tell us about{'\n'} yourself</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          editable={false}
        />

        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: '#000' }}>
            {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
            onPress={() => setGender('male')}
          >
            <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
            onPress={() => setGender('female')}
          >
            <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Modal */}
      <Modal transparent visible={showAgeModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you {age} years old?</Text>
            <Text style={styles.subTitle}>Make sure the age you entered is correct.This cannot be changed later.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContainer: { justifyContent: 'center', paddingHorizontal: 20, gap: 15, paddingVertical: 30 },
  icon: { alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  genderButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
  genderSelected: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  genderText: { fontSize: 16, color: '#000' },
  genderTextSelected: { color: '#fff', fontWeight: 'bold' },
  nextButton: { backgroundColor: '#4CAF50', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 20 },
  nextButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  modalBackground: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  confirmButton: { flex: 1, backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, marginRight: 10, alignItems: 'center' },
  cancelButton: { flex: 1, backgroundColor: '#ccc', padding: 12, borderRadius: 8, marginLeft: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subTitle:{
    fontSize:18,marginBottom:20,textAlign:"center"
  }
});
