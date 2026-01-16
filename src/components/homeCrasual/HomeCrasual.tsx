import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';


// Mock data for carousel items
const carouselItems = [
  {
    id: '1',
    name: 'Electronics',
    image: require('../../../assets/categories/electronic.png'),
    backgroundColor: '#2979FF',
  },
  {
    id: '2',
    name: 'Fashion',
    image: require('../../../assets/categories/fashion.png'),
    backgroundColor: '#8E24AA',
  },
  {
    id: '3',
    name: 'Beauty',
    image: require('../../../assets/categories/beauty.png'),
    backgroundColor: '#EC407A',
  },
  {
    id: '4',
    name: 'Home & Kitchen',
    image: require('../../../assets/categories/home.png'),
    backgroundColor: '#FB8C00',
  },
  {
    id: '5',
    name: 'Grocery',
    image: require('../../../assets/categories/grocery.png'),
    backgroundColor: '#43A047',
  },
  {
    id: '6',
    name: 'Kids',
    image: require('../../../assets/categories/toys.png'),
    backgroundColor: '#FBC02D',
  },
  {
    id: '7',
    name: 'Sports',
    image: require('../../../assets/categories/sports.png'),
    backgroundColor: '#00897B',
  },
];

export default function HomeCrasual() {
  const [activeIndex, setActiveIndex] = useState("1");
  return (
    <View className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        className="px-6"
      >
        {carouselItems.map((item) => (
          <View key={item.id} className="items-center" style={styles.itemContainer}>
            <TouchableOpacity
              className="mb-2"
              style={styles.imageContainer}
              onPress={() => setActiveIndex(item.id)}
              activeOpacity={0.7}
            >
              {item.id === activeIndex ? (
                <LinearGradient
                  colors={["#7C3AED", "#EC4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <Image
                    source={item.image}
                    style={[styles.activeCircleImage, { backgroundColor: item.backgroundColor }]}
                    resizeMode="cover"
                  />
                </LinearGradient>
              ) : (
                <View style={styles.imageBorderContainer}>
                  <Image
                    source={item.image}
                    style={[styles.circularImage, { backgroundColor: item.backgroundColor }]}
                    resizeMode="cover"
                  />
                </View>
              )}
            </TouchableOpacity>
            <Text className="text-normal-text text-sm font-medium text-center" numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        ))}

      </ScrollView>
        <View className="w-full my-2">
            {/* ==========create dots here========== */}
            <View className="flex-row items-center justify-center">
              {carouselItems.map((item) => (
                <View key={item.id} className="w-2 h-2 bg-gray-300 rounded-full mx-1" style={{ backgroundColor: item.id === activeIndex ? '#7C3AED' : '#E5E7EB' }} />
              ))}
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingRight: 24,
  },
  itemContainer: {
    minWidth: 80,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: 'transparent',
    borderRadius: 40,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circularImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBorderContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  inactiveCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
  },
});
