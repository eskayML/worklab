
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export interface WorkSession {
  id: string;
  project: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
}

const WORK_SESSIONS_KEY = 'work-sessions';

export const getWorkSessions = async (): Promise<WorkSession[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WORK_SESSIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch work sessions.', e);
    return [];
  }
};

export const saveWorkSession = async (session: Omit<WorkSession, 'id' | 'durationMinutes'>): Promise<WorkSession> => {
  const sessions = await getWorkSessions();
  const durationMinutes = (session.endTime.getTime() - session.startTime.getTime()) / 60000;
  const newSession: WorkSession = { ...session, id: uuidv4(), durationMinutes };
  const newSessions = [newSession, ...sessions];
  await AsyncStorage.setItem(WORK_SESSIONS_KEY, JSON.stringify(newSessions));
  return newSession;
};

export const updateWorkSession = async (updatedSession: WorkSession): Promise<void> => {
  const sessions = await getWorkSessions();
  const index = sessions.findIndex(s => s.id === updatedSession.id);
  if (index !== -1) {
    sessions[index] = updatedSession;
    await AsyncStorage.setItem(WORK_SESSIONS_KEY, JSON.stringify(sessions));
  }
};

export const deleteWorkSession = async (id: string): Promise<void> => {
  const sessions = await getWorkSessions();
  const newSessions = sessions.filter(s => s.id !== id);
  await AsyncStorage.setItem(WORK_SESSIONS_KEY, JSON.stringify(newSessions));
};
