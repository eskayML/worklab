import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">React Native Paper!</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={styles.button}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});
