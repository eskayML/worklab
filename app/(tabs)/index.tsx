import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useWorkSessions } from '../../context/WorkSessionContext';

export default function TimerScreen() {
  const [project, setProject] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { addSession } = useWorkSessions();

  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime.getTime());
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const handleStart = () => {
    setStartTime(new Date());
  };

  const handleStop = () => {
    if (startTime) {
      addSession({
        project,
        startTime,
        endTime: new Date(),
      });
      setStartTime(null);
      setProject('');
      setElapsedTime(0);
    }
  };

  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.timer}>
        {formatTime(elapsedTime)}
      </Text>
      <TextInput
        label="Project Name"
        value={project}
        onChangeText={setProject}
        style={styles.input}
      />
      <View style={styles.buttons}>
        <Button mode="contained" onPress={handleStart} disabled={!!startTime}>
          Start
        </Button>
        <Button mode="contained" onPress={handleStop} disabled={!startTime}>
          Stop
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  timer: {
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});