import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/main.js';
import Profile from './pages/profile.js';

const  Routes = createAppContainer(

    createStackNavigator(
       {
         Main: {
             screen: Main,
             navigationOptions: {
                  title: 'procura devs'
             },
         },
         Profile: {
             screen: Profile,
             navigationOptions: {
                title: 'perfil git'
             }  

         },  

       }, {
           defaultNavigationOptions: {
             headerTintColor: '#FFF',
             headerBackTitleVisible: false,
             headerStyle: {
             backgroundColor: '#00FFFF'
            }
           }

       }

    )

);

export default Routes