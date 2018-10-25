import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    Alert,
    ScrollView,
    TouchableHighlight
} from "react-native";
import {Header} from "react-native-elements";
import CheckBox from 'react-native-check-box';
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'

import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class CustomKeyPage extends Component<Props> {
    constructor(props) {
        super(props)
        // this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.changeValues=[]
        this.isRemoveKey=false;
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();

    }

    loadData() {
        this.languageDao.fetch()
            .then(data => {
                this.setState({
                    dataArray: data
                })

            }).catch((error) => {
            console.log(error);
        });
    }
    onBack(){
        if(this.changeValues.length ==0){
            this.props.navigation.goBack();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗?',
            [
                {
                    text: '否', onPress: () => {
                       this.props.navigation.goBack()
                    }
                }, {
                text: '是', onPress: () => {
                    this.onSave();
                }
            }
            ]
        )
    }

    onSave() {
        const {navigation} = this.props;
        if(this.changeValues.length === 0){
            navigation.goBack();
            return ;
        }
        this.languageDao.save(this.state.dataArray);
        navigation.goBack();

    }
     onClick(data,index) {
        data.checked = !data.checked;
        let dataArray = this.state.dataArray;
         dataArray[index] = data;
             this.setState({
                 dataArray:dataArray
            })

        // if(!this.isRemoveKey)data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
    }


    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views =[];
        for (let i = 0, l = len - 2; i < l; i += 2){
            views.push(
                <View key = {i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i],i)}
                       {this.renderCheckBox(this.state.dataArray[i+1],i+1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key = {len-1}>
                <View style={styles.item}>
                    {len%2===0? this.renderCheckBox(this.state.dataArray[len -2],len -2):null}

                    {this.renderCheckBox(this.state.dataArray[len -1], len-1)}
                </View>
                <View style={styles.line}/>
            </View>
        )
        return views
    }
    renderCheckBox(data,index){
        let leftText = data.name;
        // let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data,index)}
                isChecked={ data.checked}
                leftText={leftText}
                checkedImage={<Image source={require('../../pages/my/img/ic_check_box.png')}
                                     style={{tintColor:'#2196F3'}}/>}
                unCheckedImage={<Image source={require('../../pages/my/img/ic_check_box_outline_blank.png')}
                                       style={{tintColor:'#2196F3'}}/>}
            />);

    }
    render() {

        return (
            <View style={styles.container}>
                <Header statusBarProps={{barStyle: 'light-content'}}
                        leftComponent={ViewUtils.getLeftButton(() => this.onBack())}
                        rightComponent={
                            <View>
                                <Text style={{color: '#fff', fontSize: 18}} onPress={()=>this.onSave()}>保存</Text>
                            </View>
                        }
                        centerComponent={{text: '自定义标签', style: {color: '#fff', fontSize: 18}}}
                        innerContainerStyles={{alignItems: 'flex-end',}}
                        outerContainerStyles={{backgroundColor: '#2196F3'}}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    line:{
        height:0.3,
        backgroundColor: 'darkgray'
    },
    item:{
        flexDirection:'row',
    }
})
