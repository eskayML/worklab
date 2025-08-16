import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { WorkSessionProvider } from '../context/WorkSessionContext';

const theme = {
  colors: {
    primary: '#B8860B', // DarkGoldenrod (dark gold)
    secondary: '#1A1A1A', // Dark gray/black
    accent: '#87CEEB', // Sky blue
    background: '#F5F5F5', // Light gray (matches your background)
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B71C1C',
    notification: '#FF6F00',
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <WorkSessionProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </WorkSessionProvider>
  );
}
