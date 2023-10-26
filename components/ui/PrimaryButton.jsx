import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../utils/colors";
const PrimaryButton = ({ children , onPress , style }) => {
  return (
    <View style={styles.btnOuter}>
      <Pressable onPress={onPress} style={({pressed})=>{
        return pressed ? [styles.btnInner , styles.ripple ,style]  : styles.btnInner;
      }}>
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};
export default PrimaryButton;

const styles = StyleSheet.create({
  btnOuter: {
    width : "100%",
    borderRadius: 24,
    marginBottom: 8,
    elevation: 28,
    margin: 4,
    alignItems: "center",
    overflow: "hidden",
    
    
  },
  btnInner: {
    backgroundColor : colors.primary500,
    width : "100%",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnText: {
    color: "white",
    fontFamily: "montserrat",
  },
  ripple : {
    backgroundColor : colors.primar700,
  }
});
