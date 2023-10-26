import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import { generateRandomBetween } from "../utils/functions";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";
import colors from "../utils/colors";

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, isGameOver, incrementGuessRounds }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const guessRoundsLength = guessRounds.length;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (userNumber === currentGuess) {
      isGameOver();
    }
  }, [userNumber, currentGuess, isGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    incrementGuessRounds();
  }, []);

  function nextGuessHandler(direction) {
    // direction => 'lower' , 'greater'
    if (
      (direction === "lower" &&
        parseInt(currentGuess) < parseInt(userNumber)) ||
      (direction === "higher" && parseInt(currentGuess) > parseInt(userNumber))
    ) {
      Alert.alert("Don't Lie!", "You know this is wrong..", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessRounds((prev) => [newRandomNumber, ...prev]);
    incrementGuessRounds();
  }

  const horizontalOrientation = (
    <Card style={styles.horizontalCard}>
      <View>
        {/* <InstructionText style={styles.instructionText}>
    {" "}
    Higher or Lower ?{" "}
  </InstructionText> */}
        <View style={styles.buttonsContainer}>
          <View style={[styles.buttonContainer, { width: 200 }]}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color={"white"}></Ionicons>
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={[styles.buttonContainer, { width: 200 }]}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color={"white"}></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </Card>
  );

  const verticalOrientation = (
    <Card>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <InstructionText style={styles.instructionText}>
          {" "}
          Higher or Lower ?{" "}
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={[styles.buttonContainer, { flex: 1 }]}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color={"white"}></Ionicons>
            </PrimaryButton>
          </View>

          <View style={[styles.buttonContainer, { flex: 1 }]}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color={"white"}></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.screen}>
      <Title style={styles.horizontalTitle}>Opponent's Guess</Title>
      {/* GUESS */}
      {height < 500 ? horizontalOrientation : verticalOrientation}

      <View
        style={[styles.listContainer, { height: height > 500 ? 320 : 100 }]}
      >
        <FlatList
          contentContainerStyle={[styles.flatListStyle]}
          data={guessRounds}
          keyExtractor={(item) => item}
          renderItem={(dataItem) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsLength - dataItem.index}
                guessNumber={dataItem.item}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 12,
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 8,
  },
  listContainer: {
    border: 2,
    borderColor: colors.primary500,
    width: "90%",
    padding: 16,
  },
  horizontalCard: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: "80%",
  },
  horizontalTitle: {
    paddingVertical: 8,
  },
});
