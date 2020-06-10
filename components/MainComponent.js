import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';
import {COLORS} from '../utils/utils';
import Home from './HomeComponent';
import About from './About';
import DetailsComponent from './DetailsComponent';

const createNavItem = (stackScreens) => {
    const Stack = createStackNavigator();

    const showMenuIcon = (navigation) => (
        {headerLeft: (()=> <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>)})

    const createStackScreen = (name, component, first) => (<Stack.Screen name={name} component={component} key={name}
                                                                         options={({navigation}) =>{
                                                                             if(first)
                                                                                return showMenuIcon(navigation)
                                                                         }}/>)

    const createStackItem = () => (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: COLORS.DARK_COLOR},
            headerTintColor: COLORS.LIGHT_COLOR,
            headerTitleStyle: COLORS.LIGHT_COLOR}}>
            {stackScreens.map(screen => createStackScreen(screen.name, screen.component, stackScreens.indexOf(screen) === 0))}
        </Stack.Navigator>
        );

    return(
        <Drawer.Screen name={stackScreens[0].name} component={createStackItem}/>
        )

}
const Drawer = createDrawerNavigator();


const MainNavigator = () => {

    return(
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
            backgroundColor: COLORS.DARK_COLOR,
            activeTintColor: COLORS.LIGHT_COLOR,
            labelStyle: {color: COLORS.LIGHT_COLOR},
        }}>
            {createNavItem([{name: 'GitHuber', component: Home}, {name: 'UserDetails', component: DetailsComponent}])}
            {createNavItem([{name: 'About', component: About}])}

        </Drawer.Navigator>
    </NavigationContainer>)
};



function Main() {

    return(
        <View style={{flex: 1}}>
            <MainNavigator/>
        </View>
    )

}


export default Main;
