import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.6
    },
    letterContainer: {
        paddingHorizontal: 5,
        paddingTop: 40
    },
    letter: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});

export default styles;
