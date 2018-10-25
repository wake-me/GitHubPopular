import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight
} from "react-native";
import {Header} from "react-native-elements";

export default class MyPage extends Component<Props>{
    constructor(props){
        super(props)
    }
    render(){
        const {navigation} = this.props;
        return (

            <View style={styles.container}>
                <Header statusBarProps={{barStyle: 'light-content'}}
                        centerComponent={{text: '我的', style: {color: '#fff', fontSize: 20}}}
                        outerContainerStyles={{backgroundColor: '#2196F3'}}/>

                <Text style={styles.tips} onPress={() =>{
                    navigation.navigate('CustomKeyPage')
                }}>自定义标签</Text>
                <Text style={styles.tips} onPress={() =>{
                    navigation.navigate('SortKeyPage')
                }}>标签排序</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    tips:{
        fontSize: 29,

    }
})
