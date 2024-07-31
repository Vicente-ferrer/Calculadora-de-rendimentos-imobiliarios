import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import AppHome from "./src/screens/Home";
import HomeScreen from "./src/screens/FormScreen";
import ResultScreen from "./src/screens/ResultScreen";

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Work-Sans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
    "Work-Sans-Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
    "Work-Sans-ExtraBold": require("./assets/fonts/WorkSans-ExtraBold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        // Adiciona um delay de 2 segundos (2000 milissegundos)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null; // Retorna null enquanto as fontes estão sendo carregadas
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppHome">
        <Stack.Screen
          name="AppHome"
          component={AppHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
