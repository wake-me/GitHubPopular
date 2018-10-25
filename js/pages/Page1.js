/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';


type Props = {};
export default class Page1 extends Component<Props> {
    constructor(Props) {
        super(Props);

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>欢迎来到Page1</Text>
                <Button title="Go Back" onPress={() => {
                    navigation.goBack();
                }}/>
                <Button title="改变主题" onPress={() => {
                    navigation.setParams({
                        theme:{
                            tintColor:'orange',
                            updateTime:new Date().getTime()
                        }
                    })
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    page1: {
        flex: 1,
        backgroundColor: 'red'
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    image: {
        height: 22,
        width: 22
    }
});
