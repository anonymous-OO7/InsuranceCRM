import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen/HomeScreen';

//screens

//icons
import HomeIcon from '../../assets/images/tabbar/HomeIcon';
import WatchlistIcon from '../../assets/images/tabbar/WatchlistIcon';
import BellIcon from '../../assets/images/tabbar/BellIcon';

//active~
import HomeActive from '../../assets/images/tabbar/homeActive.svg';
import WatchlistActive from '../../assets/images/tabbar/watchlistActive.svg';
import BellActive from '../../assets/images/tabbar/bellActive.svg';
import Notification from '../../components/molecules/Notification';
import PolicyCenter from '../PolicyCenter/PolicyCenter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabHeight = windowHeight * (10 / 100);

const Tab = createBottomTabNavigator();

const DashBoard = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#ffffff',
        tabBarShowLabel: false,
        keyboardHidesTabBar: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          height: tabHeight,
          borderStyle: 'solid',
          borderColor: '#E2E2E2',
          overflow: 'visible',
          elevation: 20,
          shadowColor: '#000000',
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 2,
          },
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HomeActive />;
            } else {
              return <HomeIcon />;
            }
          },
        }}
      />

      <Tab.Screen
        name="HomeScreen"
        children={() => <PolicyCenter props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <WatchlistActive />;
            } else {
              return <WatchlistIcon />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        children={() => <Notification props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <BellActive />;
            } else {
              return <BellIcon />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default DashBoard;
