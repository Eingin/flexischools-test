import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import TrendingScreen from './screen/Trending';
import SearchScreen from './screen/Search';
import FeedbackScreen from './screen/Feedback';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

function Navigation() {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}: any) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}: any) => {
            let iconName = '';

            if (route.name === t('tabs.trending')) {
              iconName = 'fire';
            } else if (route.name === t('tabs.search')) {
              iconName = 'search';
            } else if (route.name === t('tabs.feedback')) {
              iconName = 'comment';
            }

            return <FAIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={t('tabs.trending')} component={TrendingScreen} />
        <Tab.Screen name={t('tabs.search')} component={SearchScreen} />
        <Tab.Screen name={t('tabs.feedback')} component={FeedbackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
