import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const GuessLogItem = ({ roundNumber, guessNumber }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>{guessNumber}</Text>
    </View>
  );
};
export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor : colors.primar700,
    borderWidth : 1,
    borderRadius : 40,
    padding : 12,
    marginVertical : 8,
    backgroundColor : colors.accent500,
    flexDirection : 'row',
    justifyContent : 'space-between',
    elevation : 4,
    shadowColor : 'black',
    shadowOffset : {width : 0 , height : 0},
    shadowOpacity : 0.25,
    shadowRadius : 3

  },
  itemText : {
    fontFamily : 'montserrat',
  }
});
