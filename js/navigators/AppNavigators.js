import { createStackNavigator} from 'react-navigation'
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs'
import React from 'react';
import {Button} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import WelcomePage from "../pages/WelcomePage";
import PopularPage from "../pages/PopularPage";
import MyPage from "../pages/my/MyPage"
import CustomKeyPage from "../pages/my/CustomKeyPage"
import SortKeyPage from "../pages/my/SortKeyPage";

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        const {theme} = routes[index].params? routes[index].params:{};
        if (theme && theme.updateTime > this.theme.updateTime) {
            this.theme = theme;
        }

        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        );
    }

}

export const AppTabNavigator = createBottomTabNavigator({
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (

                <Icon
                    name='ios-flame'
                    size={26}
                    style={{color: tintColor}}

                />


            )

        }
    },
    Page1: {
        screen: Page1,
        navigationOptions: {
            tabBarLabel: '趋势',
            title: "趋势",
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name='ios-trending-up'
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'ios-star' : 'ios-star-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name='ios-person'
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
}, {
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
        activeTintColor:  '#2196F3'
    }
});

export const AppStackNavigator = createStackNavigator({
    WelcomePage:{
        screen:WelcomePage

    },
    PopularPage:{
        screen: PopularPage,
        navigationOptions:{
            title:'账号'
        }
    },

    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({
            title: "趋势"
        })


    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            title: "Page3"
        }
    },
    MyPage: {
        screen: MyPage,

        navigationOptions: (props) => {
            const {navigation} = props;



        }


    },
    // 语言标签选择
    CustomKeyPage:{
        screen: CustomKeyPage
    },
    // 语言标签排序
    SortKeyPage: {
        screen:SortKeyPage
    },
    TabNav:{    //全部的底部导航
        screen:AppTabNavigator
    }

},{

    navigationOptions:{

        header: null
    }
});
