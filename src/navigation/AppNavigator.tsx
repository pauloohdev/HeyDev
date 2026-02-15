import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ApplicationsScreen } from '../screens/ApplicationsScreen';
import { CandidatesScreen } from '../screens/CandidatesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ConversationsScreen } from '../screens/ConversationsScreen';
import { CreateServiceScreen } from '../screens/CreateServiceScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MyServicesScreen } from '../screens/MyServicesScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ServiceDetailsScreen } from '../screens/ServiceDetailsScreen';
import { ServiceRequestSuccessScreen } from '../screens/ServiceRequestSuccessScreen';
import { initialCompanyServices } from '../data/mockData';
import { colors } from '../theme/colors';
import type { CompanyService, MainTabParamList, RootStackParamList, UserType } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

type Props = {
  userType: UserType;
  onSelectUserType: (type: UserType) => void;
};

function MainTabs({ userType, companyServices, onHireCandidate }: { userType: UserType; companyServices: CompanyService[]; onHireCandidate: (serviceId: string, candidateId: string, candidateName: string) => void }) {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: '#0b1220' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: { backgroundColor: colors.bg },
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <Pressable onPress={() => navigation.getParent()?.navigate('Conversations')}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.text} />
            </Pressable>
            <Pressable onPress={() => navigation.getParent()?.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
            </Pressable>
          </View>
        )
      })}
    >
      <Tabs.Screen name="Feed">
        {(props) => <FeedScreen {...props} userType={userType} onOpenService={(serviceId) => props.navigation.getParent()?.navigate('ServiceDetails', { serviceId })} />}
      </Tabs.Screen>
      {userType === 'developer' && (
        <Tabs.Screen name="Applications">
          {(props) => <ApplicationsScreen {...props} onOpenChat={(conversationId, title) => props.navigation.getParent()?.navigate('Chat', { conversationId, title })} />}
        </Tabs.Screen>
      )}
      <Tabs.Screen name="MyServices">
        {(props) => (
          <MyServicesScreen
            {...props}
            userType={userType}
            companyServices={companyServices}
            onOpenCandidates={(serviceId) => props.navigation.getParent()?.navigate('Candidates', { serviceId })}
            onOpenService={(serviceId) => props.navigation.getParent()?.navigate('ServiceDetails', { serviceId })}
            onOpenChat={(conversationId, title) => props.navigation.getParent()?.navigate('Chat', { conversationId, title })}
          />
        )}
      </Tabs.Screen>
      {userType === 'company' && <Tabs.Screen name="CreateService" component={CreateServiceScreen} options={{ title: 'Criar' }} />}
      <Tabs.Screen name="Profile">{(props) => <ProfileScreen {...props} userType={userType} />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}

export function AppNavigator({ onSelectUserType, userType }: Props) {
  const [companyServices, setCompanyServices] = useState<CompanyService[]>(initialCompanyServices);

  const handleHireCandidate = (serviceId: string, candidateId: string, candidateName: string) => {
    setCompanyServices((previous) =>
      previous.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status: 'hired',
              hiredCandidateId: candidateId,
              conversationId: `conv-${serviceId}-${candidateId}`,
              conversationTitle: `${service.title} • ${candidateName}`
            }
          : service
      )
    );
  };

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
          {() => <MainTabs userType={userType} companyServices={companyServices} onHireCandidate={handleHireCandidate} />}
        </Stack.Screen>
        <Stack.Screen name="ServiceDetails" options={{ title: 'Detalhes do serviço' }}>
          {(props) => <ServiceDetailsScreen {...props} userType={userType} />}
        </Stack.Screen>
        <Stack.Screen name="ServiceRequestSuccess" component={ServiceRequestSuccessScreen} options={{ title: 'Solicitação' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="Conversations" component={ConversationsScreen} options={{ title: 'Conversas' }} />
        <Stack.Screen name="Notifications" options={{ title: 'Notificações' }}>
          {(props) => <NotificationsScreen {...props} userType={userType} />}
        </Stack.Screen>
        <Stack.Screen name="Candidates" options={{ title: 'Candidatos' }}>
          {(props) => (
            <CandidatesScreen
              {...props}
              companyServices={companyServices}
              onOpenChat={(conversationId, title) => props.navigation.navigate('Chat', { conversationId, title })}
              onHireCandidate={handleHireCandidate}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
