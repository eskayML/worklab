
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { useWorkSessions } from '../../context/WorkSessionContext';
import { WorkSession } from '../../lib/storage';

export default function SummaryScreen() {
  const { sessions, loading } = useWorkSessions();

  const dailyTotals = sessions.reduce((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += session.durationMinutes;
    return acc;
  }, {} as { [key: string]: number });

  const weeklyTotal = sessions.reduce((acc, session) => {
    return acc + session.durationMinutes;
  }, 0);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Weekly Summary</Title>
          <Paragraph>Total Hours: {(weeklyTotal / 60).toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      {Object.keys(dailyTotals).map(date => (
        <Card key={date} style={styles.card}>
          <Card.Content>
            <Title>{date}</Title>
            <Paragraph>Total Hours: {(dailyTotals[date] / 60).toFixed(2)}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});
