import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "../hooks/useTheme";
import { lightTheme } from "../themes/theme";
import { useRouter } from 'expo-router';

interface Book {
    id: string;
    title: string;
    cover: any; // 或者使用更具体的类型，如 ImageSourcePropType
}

const books = [
    { id: '1', title: '深空彼岸', cover: require('../assets/cover/Default_Cover_01.png') },
    { id: '2', title: '网文', cover: require('../assets/cover/Default_Cover_02.png') },
    { id: '3', title: '哈利·波特与火焰杯火焰杯火焰杯', cover: require('../assets/cover/Default_Cover_03.png') },
    { id: '4', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_04.png') },
    { id: '5', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_05.png') },
    { id: '6', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_06.png') },
    { id: '7', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_07.png') },
    { id: '8', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_08.png') },
    { id: '9', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_01.png') },
    { id: '10', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_02.png') },
    { id: '11', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_03.png') },
    { id: '12', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_04.png') },
    { id: '13', title: '哈利·波特与火焰杯', cover: require('../assets/cover/Default_Cover_05.png') },
    // Add more books...
    { id: 'add', title: '', cover: '' },
];

const Books = () => {

    const { theme } = useTheme();
    const styles = createStyles(theme);
    const router = useRouter();

    const renderBookItem = ({ item }: { item: Book }) => {
        if (item.id === 'add') {
            return (
                <TouchableOpacity style={styles.bookItem} activeOpacity={0.6}>
                    <View style={styles.bookImport}>
                        <MaterialCommunityIcons name="plus" size={32} color="#717882" />
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.bookItem} activeOpacity={0.8} onPress={()  => handleReading(item.id)}>
                <View style={styles.bookWrap}>
                    <Image style={styles.bookCover} source={item.cover} />
                    <View style={styles.subWrap}>
                        <Text style={styles.bookSubTitle} numberOfLines={2}>{item.title}</Text>
                    </View>
                </View>
                <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        )
    };

    const handleReading = (id: string) => {
        router.push(`/book/${id}`);
    }

    const booksStats = () => {
        return (
            <View style={styles.bookStats}>
                <Text style={styles.bookStatsText}>124 本公开阅读</Text>
            </View>
        );
    }

    return (
        <FlatList<Book>
            data={books}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={styles.bookRow}
            ListFooterComponent={booksStats}
        />
    );
}

const createStyles = (theme: typeof lightTheme) =>
    StyleSheet.create({
        bookRow: {
            justifyContent: 'flex-start',
            marginTop: 30,
        },
        bookItem: {
            alignItems: 'center',
            width: '33.33%',
            marginBottom: 10,
        },
        bookWrap: {
            width: 100,
            height: 150,
        },
        bookCover: {
            width: 100,
            height: 150,
            resizeMode: 'cover',
            borderColor: '#E5E5E5',
            borderWidth: 1,
        },
        bookTitle: {
            marginTop: 20,
            marginHorizontal: 10,
            textAlign: 'center',
            flexWrap: 'wrap',
            fontWeight: 'bold',
        },
        subWrap: {
            position: 'absolute',
            top: 5,
            left: 0,
            right: 0,
            padding: 10,
        },
        bookSubTitle: {
            fontSize: 12,
            textAlign: 'center',
        },
        bookImport: {
            width: 100,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.secondary,
        },
        bookStats: {
            marginTop: 20,
            marginBottom: 40,
        },
        bookStatsText: {
            textAlign: 'center',
            color: theme.colors.tertiary,
        },
    });

export default Books;