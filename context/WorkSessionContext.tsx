
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  WorkSession,
  getWorkSessions,
  saveWorkSession,
  updateWorkSession,
  deleteWorkSession,
} from '../lib/storage';

interface WorkSessionContextData {
  sessions: WorkSession[];
  loading: boolean;
  addSession: (session: Omit<WorkSession, 'id' | 'durationMinutes'>) => Promise<void>;
  updateSession: (session: WorkSession) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

const WorkSessionContext = createContext<WorkSessionContextData>({} as WorkSessionContextData);

export const WorkSessionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    const sessions = await getWorkSessions();
    setSessions(sessions);
    setLoading(false);
  };

  const addSession = async (session: Omit<WorkSession, 'id' | 'durationMinutes'>) => {
    const newSession = await saveWorkSession(session);
    setSessions(prevSessions => [newSession, ...prevSessions]);
  };

  const updateSession = async (session: WorkSession) => {
    await updateWorkSession(session);
    loadSessions(); // Reload all sessions to reflect the update
  };

  const deleteSession = async (id: string) => {
    await deleteWorkSession(id);
    setSessions(prevSessions => prevSessions.filter(s => s.id !== id));
  };

  return (
    <WorkSessionContext.Provider
      value={{ sessions, loading, addSession, updateSession, deleteSession }}
    >
      {children}
    </WorkSessionContext.Provider>
  );
};

export const useWorkSessions = () => useContext(WorkSessionContext);
