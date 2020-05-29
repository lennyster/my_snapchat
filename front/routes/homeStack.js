import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';

const screens = {
    Home: {
        screen: Home
    },
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },
    
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      header: null,
    //   gesturesEnabled: false
    }
  });

export default createAppContainer(HomeStack)