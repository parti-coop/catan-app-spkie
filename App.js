import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';

import AuthLoadingScreen from './components/screens/AuthLoading';
import SignInScreen from './components/screens/SignIn';

import TimelineScreen from './components/screens/Timeline';
import ChatScreen from './components/screens/Chat';
import WikiScreen from './components/screens/Wiki';

//
// App
//
class App extends React.Component {
  render() {
    return <AppContainer/>
  }
}

export default App;


//
// Navigators for Dashboard
//
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Timeline: TimelineScreen,
    Chat: ChatScreen,
    Wiki: WikiScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const DashboardDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator }
});


//
// AppSwitchNavigator
//
const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    SignIn: { screen: SignInScreen },
    Dashboard: { screen: DashboardDrawerNavigator }
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
