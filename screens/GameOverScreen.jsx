import { StyleSheet, Text, View, Image, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import colors from "../utils/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ guessRounds , userNumber , onStartAgain}) => {
  const {width , height }= useWindowDimensions();

  let imageSize = 300;
  if(width<380)
  {
    imageSize = 150;
  }
  if(height<500)
  {
    imageSize = 120;
  }

  const imageStyle = {
    height : imageSize,
    width : imageSize,
    borderRadius : imageSize/2,
  };

  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={[styles.imageContainer , imageStyle]}>
        <Image
          style={styles.img}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlightText}>{guessRounds}</Text> rounds to
        guess the number <Text style={styles.highlightText}>{userNumber}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onStartAgain}>Start Again</PrimaryButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 240,
    width: 240,
    borderRadius: 120,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.primar600,
    margin: 24,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  summaryText: {
    fontFamily: "montserrat",
    fontSize: 16,
    textAlign: "center",
  },
  highlightText: {
    fontWeight: "bold",
    color: colors.primary600,
  },
  buttonContainer : {
    width : '100%',
    paddingHorizontal : 64,
    height : 80,
    marginTop : 16,
    justifyContent : 'center',
  }
});
