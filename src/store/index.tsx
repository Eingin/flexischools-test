import React, {createContext, useContext} from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

const StorageContext = createContext<Storage | null>(null);

export const useStorage = (): Storage => {
  const storageValue = useContext(StorageContext);
  if (!storageValue) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return storageValue;
};

export const StorageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};
