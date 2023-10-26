import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { useState } from "react";
import colors from "../utils/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onNumberPick }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (newValue) => {
    setEnteredNumber(newValue);
  };
  const confirmPressHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number !", "Number must be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetPressHandler },
      ]);
      return;
    }
    onNumberPick(chosenNumber);
  };
  const resetPressHandler = () => {
    setEnteredNumber("");
  };

  const marginTopDistance = height < 500 ? 0 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetPressHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmPressHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
  },
  numberInput: {
    fontSize: 50,
    fontFamily: "montserrat",
    fontWeight: "bold",
    color: colors.accent500,
    marginVertical: 16,
    borderBottomWidth: 4,
    borderBottomColor: colors.accent500,
    width: 80,
    alignItems: "center",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default StartGameScreen;
