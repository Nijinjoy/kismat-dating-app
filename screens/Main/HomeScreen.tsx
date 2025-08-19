import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Emily, 25',
      location: 'New York',
      bio: `Love hiking, coffee addict ☕, and a dog mom 🐶.\n\nI enjoy photography, exploring new cuisines, and Sunday morning yoga. Looking for someone who can match my energy and join me on spontaneous trips.`,
      images: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/women/45.jpg',
        'https://randomuser.me/api/portraits/women/46.jpg',
      ],
    },
    {
      id: 2,
      name: 'Sophia, 27',
      location: 'Los Angeles',
      bio: `Photographer 📸 and beach lover 🌊. I love sunsets, live music, and trying new street food. Big believer in good vibes only.`,
      images: [
        'https://randomuser.me/api/portraits/women/65.jpg',
        'https://randomuser.me/api/portraits/women/66.jpg',
      ],
    },
  ]);

  const renderCard = (card) => {
    return (
      <View style={styles.card}>
        {/* Name at the top */}
        <Text style={styles.profileName}>{card.name}</Text>

        {/* Multiple swipeable images */}
        <FlatList
          data={card.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.profileImage} />
          )}
        />

        {/* Scrollable Bio */}
        <ScrollView style={styles.profileInfo}>
          <Text style={styles.profileLocation}>{card.location}</Text>
          <Text style={styles.profileBio}>{card.bio}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={renderCard}
        stackSize={1}
        backgroundColor="transparent"
        cardIndex={0}
        verticalSwipe={false}
      />

      {/* Fixed Action Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6b6b' }]}>
          <MaterialIcon name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]}>
          <Icon name="heart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: width * 0.9,
    height: height * 0.4,
  },
  profileInfo: {
    padding: 15,
    flex: 1,
  },
  profileLocation: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  buttonsRow: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
