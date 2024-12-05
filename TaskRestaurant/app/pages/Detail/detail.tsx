import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Linking, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  strMealThumb: string;
};

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const [mealDetail, setMealDetail] = useState<MealDetail | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setMealDetail(data.meals[0] as MealDetail));
    }
  }, [id]);

  if (!mealDetail) return null; 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${mealDetail.strMealThumb}/preview` }} style={styles.mealImage} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.mealName}>{mealDetail.strMeal}</Text>
        <View style={styles.line}></View>
        <Text style={styles.category}>{mealDetail.strCategory}</Text>
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructions}>{mealDetail.strInstructions}</Text>
        <Button
          title="Watch on YouTube"
          onPress={() => Linking.openURL(mealDetail.strYoutube)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  mealImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mealName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f', 
  },
  line: {
    height: 2,
    backgroundColor: '#d32f2f', 
    marginVertical: 8,
  },
  category: {
    fontSize: 18,
    color: '#777',
  },
  instructionContainer: {
    padding: 16,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
});
