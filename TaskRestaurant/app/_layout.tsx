import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="Category/index" options={{ title: 'Categories' }} />
      <Stack.Screen name="Meal/meals" options={{ title: 'Meals' }} />
      <Stack.Screen name="Detail/detail" options={{ title: 'Meal Detail' }} />
    </Stack>
  );
}