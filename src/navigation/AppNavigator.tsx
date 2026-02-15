import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ApplicationsScreen } from '../screens/ApplicationsScreen';
import { CandidatesScreen } from '../screens/CandidatesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { CreateServiceScreen } from '../screens/CreateServiceScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MyServicesScreen } from '../screens/MyServicesScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ServiceDetailsScreen } from '../screens/ServiceDetailsScreen';
import { ServiceRequestSuccessScreen } from '../screens/ServiceRequestSuccessScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList, RootStackParamList, UserType } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

type Props = {
  userType: UserType;
  onSelectUserType: (type: UserType) => void;
};

function MainTabs({ userType }: { userType: UserType }) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: '#0b1220' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: { backgroundColor: colors.bg },
        tabBarIcon: ({ color, size }) => {
          const iconByRoute: Record<string, keyof typeof Ionicons.glyphMap> = {
            Feed: 'grid-outline',
            Applications: 'document-text-outline',
            MyServices: 'briefcase-outline',
            CreateService: 'add-circle-outline',
            Profile: 'person-outline'
          };
          return <Ionicons name={iconByRoute[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tabs.Screen name="Feed">
        {(props) => <FeedScreen {...props} onOpenService={(serviceId) => props.navigation.getParent()?.navigate('ServiceDetails', { serviceId })} />}
      </Tabs.Screen>
      <Tabs.Screen name="Applications">
        {(props) => <ApplicationsScreen {...props} onOpenChat={(conversationId, title) => props.navigation.getParent()?.navigate('Chat', { conversationId, title })} />}
      </Tabs.Screen>
      <Tabs.Screen name="MyServices">
        {(props) => <MyServicesScreen {...props} userType={userType} onOpenCandidates={(serviceId) => props.navigation.getParent()?.navigate('Candidates', { serviceId })} />}
      </Tabs.Screen>
      {userType === 'company' && <Tabs.Screen name="CreateService" component={CreateServiceScreen} options={{ title: 'Criar' }} />}
      <Tabs.Screen name="Profile">{(props) => <ProfileScreen {...props} userType={userType} />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}

export function AppNavigator({ onSelectUserType, userType }: Props) {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: colors.bg }
      }}
    >
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg }
        }}
      >
        <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
          {(props) => <OnboardingScreen {...props} onSelectUserType={onSelectUserType} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => <MainTabs userType={userType} />}
        </Stack.Screen>
        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ title: 'Detalhes do serviço' }} />
        <Stack.Screen name="ServiceRequestSuccess" component={ServiceRequestSuccessScreen} options={{ title: 'Solicitação' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="Candidates" component={CandidatesScreen} options={{ title: 'Candidatos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
