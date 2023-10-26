import { StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";

const InstructionText = ({ children , style }) => {
  return <Text style={[styles.instructionText , style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 16,
    fontFamily : "montserrat-semibold",
    color: colors.accent500,
    // marginBottom : 8,
    textAlign : 'center',
  },
});
