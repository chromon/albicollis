import { StyleSheet, Text, View } from "react-native";

const NotFoundScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Oops! Screen Not Found.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NotFoundScreen;