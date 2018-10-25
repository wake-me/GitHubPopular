import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Header} from 'react-native-elements'
export default class WelcomePage extends Component<Props>{
    static navigationOptions ={
        title: "欢迎"
    };

    componentDidMount(){
        const {navigation} = this.props;
        const navigateAction = NavigationActions.navigate({
            routeName: 'TabNav',
            params: { title: '最热' }
        });
       this.timer = setTimeout(()=>{
            navigation.reset([navigateAction])
        },2000)
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
    }

    render(){

        return <View >
            <Header  statusBarProps={{ barStyle: 'light-content' }}
                     centerComponent={{ text: '欢迎', style: { color: '#fff',fontSize:20 } }}
                     outerContainerStyles={{ backgroundColor: '#2196F3' }}/>
            <Text>欢迎</Text>
        </View>
    }
}
