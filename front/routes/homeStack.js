import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import All from '../screens/All';
import Send from '../screens/Send';
import Preview from '../screens/Preview';
import MySnaps from '../screens/MySnaps';
import DisplaySnap from '../screens/DisplaySnap';

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
    All:{
        screen: All
    },
    Send:{
        screen: Send
    },
    Preview:{
        screen: Preview
    },
    MySnaps:{
        screen: MySnaps
    },
    DisplaySnap:{
        screen: DisplaySnap
    }
    
};


const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  });

export default createAppContainer(HomeStack)