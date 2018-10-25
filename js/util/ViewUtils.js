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

export default class ViewUtils {
    static  getLeftButton(callBack){
        return <TouchableHighlight
                onPress={callBack}
                style={{marginLeft:-10}}
            >
            <Image style={{width:26,height:26, tintColor:'#fff'}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableHighlight>
    }

}
