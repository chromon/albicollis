import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "../../hooks/useTheme";

const TabLayout = () => {

    const { theme } = useTheme();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarStyle: { height: 64 },
            tabBarIconStyle: { marginTop: 10 },
            tabBarLabelStyle: {
                marginBottom: 10,
                fontWeight: 'bold',
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'BookHome',
                    tabBarLabel: '主页',
                    tabBarIcon: ({ focused, color }) => {
                        return focused
                            ? <MaterialCommunityIcons name="home" size={28} color={color} />
                            : <MaterialCommunityIcons name="home-outline" size={28} color={color} />
                    }
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'BookShelf',
                    tabBarLabel: '书架',
                    // tabBarBadge: 1
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="bookshelf" size={28} color={color} />
                    },
                }}
            />
            <Tabs.Screen
                name="review"
                options={{
                    title: 'BookReview',
                    tabBarLabel: '书评',
                    tabBarIcon: ({ focused, color,  }) => {
                        return focused
                            ? <MaterialCommunityIcons name="comment-text-outline" size={24} color={color} />
                            : <MaterialCommunityIcons name="comment-outline" size={24} color={color} />
                    }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: '我',
                    tabBarIcon: ({ focused, color }) => {
                        return focused
                            ? <MaterialCommunityIcons name="account" size={28} color={color} />
                            : <MaterialCommunityIcons name="account-outline" size={28} color={color} />
                    },
                }}
            />
        </Tabs>
    );
}

export default TabLayout;