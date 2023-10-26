import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useCallback } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  const [pickedNumber, setPickedNumber] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const incrementGuessRounds = ()=>{
    setGuessRounds((prev)=>(prev+1));
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const numberPickHandler = (pickedNumber) => {
    setPickedNumber(pickedNumber);
    setIsGameOver(false);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const startAgainHandler = () => {
    setPickedNumber(null);
    setGuessRounds(0);
  };

  let screen = pickedNumber ? (
    <GameScreen userNumber={pickedNumber} isGameOver={handleGameOver} incrementGuessRounds ={incrementGuessRounds} />
  ) : (
    <StartGameScreen onNumberPick={numberPickHandler} />
  );

  if (isGameOver && pickedNumber) {
    screen = (
      <GameOverScreen
        guessRounds={guessRounds}
        userNumber={pickedNumber}
        onStartAgain={startAgainHandler}
      />
    );
  }

  return (
    <>
    <StatusBar style="light"/>
    <LinearGradient
      colors={["#ab2f02d5", "#f5bd05c8"]}
      style={styles.appContainer}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        style={styles.appContainer}
        source={require("./assets/images/background.png")}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.appContainer}>{screen}</SafeAreaView>
        {/* {screen} */}
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 16 : 0,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});
