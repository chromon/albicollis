import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '../contexts/theme_context';
import { LocalThemeProvider } from '../contexts/local_theme_context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppLayout = () => {
    return (
        <GestureHandlerRootView>
            <ThemeProvider>
                <LocalThemeProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" options={{ title: 'Screen Not Found' }} />
                        <Stack.Screen name="book/[id]" options={{ headerShown: false }} />
                    </Stack>

                </LocalThemeProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

export default AppLayout;