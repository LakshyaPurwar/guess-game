import { StyleSheet, View } from "react-native";
import colors from "../../utils/colors";

const Card = ({children , style}) => {
  return <View style={[styles.inputContainer , style]}>{children}</View>;
};
export default Card;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: colors.primary600,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#130404a4",
    alignItems: "center",
  },
});
