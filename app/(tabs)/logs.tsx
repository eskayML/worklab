import React from 'react';
import { View, SectionList, StyleSheet } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { useWorkSessions } from '../../context/WorkSessionContext';
import { WorkSession } from '../../lib/storage';

export default function LogsScreen() {
  const { sessions, loading, deleteSession } = useWorkSessions();

  const sessionsByDate = sessions.reduce((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as { [key: string]: WorkSession[] });

  const sections = Object.keys(sessionsByDate).map(date => ({
    title: date,
    data: sessionsByDate[date],
  }));

  const renderItem = ({ item }: { item: WorkSession }) => (
    <List.Item
      title={item.project || 'No Project'}
      description={`Duration: ${item.durationMinutes.toFixed(2)} minutes`}
      right={() => (
        <IconButton
          icon="delete"
          onPress={() => deleteSession(item.id)}
        />
      )}
    />
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <List.Subheader>{title}</List.Subheader>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});