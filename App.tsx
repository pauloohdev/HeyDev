import 'react-native-gesture-handler';

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppNavigator } from './src/navigation/AppNavigator';
import type { UserType } from './src/types/navigation';

export default function App() {
  const [userType, setUserType] = useState<UserType>('developer');

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator userType={userType} onSelectUserType={setUserType} />
    </>
  );
}
