import { Text , StyleSheet } from "react-native";
import colors from "../../utils/colors";

const Title = ({children , style})=>{
return <Text style={[styles.title , style]}>{children}</Text>
}
export default Title;
const styles = StyleSheet.create({
    title : {
        fontSize : 24,
        fontFamily : 'montserrat-bold',
        color : 'white',
        borderWidth : 4,
        borderColor : 'white',
        padding : 12,
        textAlign : 'center',
        marginBottom : 12,
        width : 320,
        maxWidth : '80%',
      }, 
});
