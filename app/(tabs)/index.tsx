import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { lightTheme } from "../../themes/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from "../../hooks/useTheme";
import Books from "../../components/books";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import '../../components/sheets.tsx'

const BookShelf = () => {

    const { theme, toggleTheme } = useTheme();
    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <SheetProvider>
                <View style={styles.searchBar}>
                    <MaterialIcons name="search" size={24} color={theme.colors.tertiary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="无力挣扎的阿玥的一生"
                        selectionColor={theme.colors.primary}
                    />
                    <TouchableOpacity onPress={() => SheetManager.show('example-sheet')}>
                        <MaterialCommunityIcons name="plus" size={24} color={theme.colors.tertiary} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.toolBar} activeOpacity={0.8} >
                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={theme.colors.tertiary} />
                    <Text style={styles.select}>选择</Text>
                </TouchableOpacity>
                <Books />
            </SheetProvider>
        </SafeAreaView>
    );
}

const createStyles = (theme: typeof lightTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            margin: 20,
            backgroundColor: '#ECEDF1',
            borderColor: '#ECEDF1',
            borderRadius: 10,
        },
        searchIcon: {
            marginHorizontal: 5,
        },
        searchInput: {
            flex: 1,
            marginLeft: 5,
        },
        toolBar: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: theme.colors.background,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.secondary,
        },
        select: {
            fontSize: 14,
            marginRight: 15,
            marginLeft: 5,
        },
    });


export default BookShelf;