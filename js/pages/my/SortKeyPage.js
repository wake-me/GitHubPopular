import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,

    Alert,

    TouchableHighlight
} from "react-native";
import {Header} from "react-native-elements";
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'

import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import SortableListView from 'react-native-sortable-listview'
export default class SortKeyPage extends Component<Props> {
    constructor(props) {
        super(props);
        // this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.dataArray= [];
        this.sortResultArray = [];
        this.originalCheckedArray=[];
        this.state = {
            checkedArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();

    }

    /**
     * 读取语言数据
     */
    loadData() {
        this.languageDao.fetch()
            .then(data => {

              this.getCheckedItems(data)

            }).catch((error) => {
            console.log(error);
        });
    }

    /**
     *  获取选中的数组
     * @param dataArray
     */
    getCheckedItems(dataArray) {
        // 保存原始数据
        this.dataArray = dataArray;
        //  保存用户已经保存的数组
        let checkedArray = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray
        });
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    onBack(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
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
                    this.onSave(true);
                }
            }
            ]
        )
    }

    onSave(haChecked) {
        if (!haChecked) {
            if (ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)) {
                this.props.navigation.goBack();
            }
        }

        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigation.goBack();
    }

    getSortResult(){
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i =0, l = this.originalCheckedArray.length; i< l; i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item)
            this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
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
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} />}
                />
            </View>
        )
    }
}
class SortCell extends Component{
    render(){
        return  (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[styles.image,{tintColor:'#2196F3'}]}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
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
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        opacity: 1,
        width: 16,
        height: 16,
        marginRight: 10,

    }
})
