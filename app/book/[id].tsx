import { View, Text, Animated, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { lightTheme } from '../../themes/theme';
import { useLocalTheme } from '../../hooks/useLocalTheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SheetManager } from 'react-native-actions-sheet';

export default function Book() {
    const { id } = useLocalSearchParams();

    const { theme, toggleTheme } = useLocalTheme();
    const styles = createStyles(theme);

    // 上下工具栏
    const [toolsBarVisible, setToolsBarVisible] = useState(false);
    const translateYBottom = useRef(new Animated.Value(50)).current;
    const translateYTop = useRef(new Animated.Value(-80)).current;
    // 状态栏
    const [statusBarVisible, setStatusBarVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        const totalPages = 100;
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const toggleStatusBars = () => {
        const toValueBottom = toolsBarVisible ? 50 : 0;
        const toValueTop = toolsBarVisible ? -80 : 0;
        Animated.parallel([
            Animated.spring(translateYBottom, {
                toValue: toValueBottom,
                useNativeDriver: true,
                bounciness: 3,
            }),
            Animated.spring(translateYTop, {
                toValue: toValueTop,
                useNativeDriver: true,
                bounciness: 3,
            })
        ]).start();
        setToolsBarVisible(!toolsBarVisible);

        // 动态隐藏状态栏
        StatusBar.setHidden(statusBarVisible);
        setStatusBarVisible(!statusBarVisible);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Animated.View style={[
                styles.toolsBar,
                styles.topToolsBar,
                { transform: [{ translateY: translateYTop }] }
            ]}>
                <View style={styles.toolsBarWrap}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="chevron-left" size={26} color={theme.colors.tertiary} />
                    </TouchableOpacity>
                    <View style={styles.toolsBarItems}>
                        <TouchableOpacity onPress={() => SheetManager.show('example-sheet')}>
                            <MaterialIcons name="more-vert" size={22} color={theme.colors.tertiary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SheetManager.show('example-sheet')}>
                            <MaterialCommunityIcons name="share-variant-outline" size={22}
                                color={theme.colors.tertiary} style={styles.itemMargin} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SheetManager.show('example-sheet')}>
                            <MaterialCommunityIcons name="book-check-outline" size={22}
                                color={theme.colors.tertiary} style={styles.itemMargin} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            <View style={styles.contentArea}>
                <View>
                    <Text style={styles.contentText}>点击这里显示 / 隐藏状态栏, Reading Book ID: {id}, Page: {currentPage}</Text>
                </View>
                <View style={styles.touchLayer}>
                    <TouchableOpacity
                        style={styles.leftTouch}
                        onPress={handlePrevPage}
                    />
                    <TouchableOpacity
                        style={styles.centerTouch}
                        onPress={toggleStatusBars}
                    />
                    <TouchableOpacity
                        style={styles.rightTouch}
                        onPress={handleNextPage}
                    />
                </View>
            </View>

            <Animated.View style={[
                styles.toolsBar,
                styles.bottomToolsBar,
                { transform: [{ translateY: translateYBottom }] }
            ]}>
                <View style={styles.toolsBarWrap}>
                    <View style={styles.bottomToolsBarItems}>
                        <MaterialCommunityIcons name="format-list-bulleted" size={22} color={theme.colors.tertiary} />
                        <MaterialCommunityIcons name="draw-pen" size={22} color={theme.colors.tertiary} />
                        <FontAwesome name="sliders" size={22} color={theme.colors.tertiary} />
                        <MaterialCommunityIcons name="white-balance-sunny" size={22} color={theme.colors.tertiary} />
                        <FontAwesome name="font" size={20} color={theme.colors.tertiary} />
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const createStyles = (theme: typeof lightTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        contentArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            paddingTop: 50,
        },
        contentText: {
            color: theme.colors.text,
        },
        toolsBar: {
            position: 'absolute',
            left: 0,
            right: 0,
            backgroundColor: theme.colors.quaternary,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        },
        topToolsBar: {
            paddingTop: 20,
            height: 70,
            top: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.secondary,
        },
        toolsBarWrap: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        toolsBarItems: {
            flex: 1,
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        itemMargin: {
            marginRight: 20,
        },
        bottomToolsBar: {
            height: 50,
            bottom: 0,
        },
        bottomToolsBarItems: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        touchLayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
        },
        leftTouch: {
            width: width * 0.3,
            height: height,
        },
        centerTouch: {
            width: width * 0.4,
            height: height,
        },
        rightTouch: {
            width: width * 0.3,
            height: height,
        },
    });