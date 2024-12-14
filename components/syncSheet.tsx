import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { lightTheme } from "../themes/theme";
import { useTheme } from "../hooks/useTheme";
import { useSync } from "../hooks/useSync";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Option {
    icon: IconName;
    text: string;
    handlePress: () => {},
    subText?: string;
}

const SyncSheet: React.FC = () => {

    const { theme, toggleTheme } = useTheme();
    const styles = createStyles(theme);

    const { metadata, syncMetadata } = useSync();

    const options: Option[] = [
        { icon: "sync", text: '同步数据', handlePress: syncMetadata, subText: metadata },
        { icon: "folder-network-outline", text: '从电脑导入', handlePress: syncMetadata, },
        { icon: "folder-outline", text: '从本地导入', handlePress: syncMetadata, },
        { icon: "web", text: '网页版', handlePress: syncMetadata, },
    ];

    return (
        <ActionSheet>
            <View style={styles.container}>
                <Text style={styles.header}>导入书籍</Text>
                <Text style={styles.subHeader}>支持 txt / epub / pdf / doc / docx / mobi / azw3</Text>

                {options.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton} activeOpacity={0.5} onPress={option.handlePress}>
                        <MaterialCommunityIcons name={option.icon} color="#000" size={20} />
                        <View style={styles.textContainer}>
                            <Text style={styles.optionText}>{option.text}</Text>
                            {option.subText && <Text style={styles.subText}>{metadata}</Text>}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ActionSheet>
    );
}

const createStyles = (theme: typeof lightTheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: '#FFF',
            padding: 20,
            borderRadius: 8,
            marginBottom: 18,
        },
        header: {
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 4,
            paddingTop: 10,
        },
        subHeader: {
            color: theme.colors.tertiary,
            fontSize: 14,
            marginTop: 16,
            marginBottom: 16,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.secondary,
        },
        optionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 18,
        },
        textContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 16,
        },
        optionText: {
            color: '#000',
            fontSize: 16,
        },
        subText: {
            color: theme.colors.tertiary,
            fontSize: 12,
        },
    });

export default SyncSheet;