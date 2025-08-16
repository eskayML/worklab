import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, View, StyleSheet } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        headerTitle: 'Work Lab',
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <Image
              source={require('../../assets/images/worklab logo.png')}
              style={styles.headerLogo}
            />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Icon source="timer-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          tabBarIcon: ({ color }) => <Icon source="format-list-bulleted" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          tabBarIcon: ({ color }) => <Icon source="chart-bar" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 10,
  },
  headerLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
