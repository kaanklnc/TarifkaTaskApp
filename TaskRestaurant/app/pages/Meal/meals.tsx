import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function MealsScreen() {
  const { category } = useLocalSearchParams();
  const [meals, setMeals] = useState<Meal[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals));
    }
  }, [category]);

  const renderMeal = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.mealContainer}
      onPress={() =>
        router.push({
          pathname: '/pages/Detail/detail',
          params: { id: item.idMeal },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${item.strMealThumb}/preview` }} style={styles.mealImage} />
        <Text style={styles.mealText}>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Meals</Text>
      <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={(item) => item.idMeal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'orange',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  mealContainer: {

  
    padding: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
   
    borderColor: '#333', 
    alignItems: 'center', 
  },
  imageContainer: {
    position: 'relative', 
    width: '100%',
    height: 250, 
    borderRadius: 8,
  },
  mealImage: {
    width: '100%',
    height: '100%', 
    borderRadius: 8,
  },
  mealText: {
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    textAlign: 'center', 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
    paddingHorizontal: 10, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 8,
    paddingVertical: 5, 
  },
});
