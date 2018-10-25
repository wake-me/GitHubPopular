import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList, RefreshControl} from 'react-native';
import DataRepository from '../expand/dao/DataRepository'
import {Header} from 'react-native-elements'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component<Props> {


    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            languages: []
        };
        this.loadLanguage()
    };


    loadLanguage() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            }).catch(error => {
            console.log(error)
        })
    }


    render() {
        let navigationBar = <Header statusBarProps={{barStyle: 'light-content'}}
                                    centerComponent={{text: '最热', style: {color: '#fff', fontSize: 20}}}
                                    outerContainerStyles={{backgroundColor: '#2196F3', borderBottomWidth: 0}}/>;

        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2,}}
                                                      tabStyle={{height: 39}}/>}
                initialPage={0}
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
            >
                {this.state.languages.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <PopularTab tabLabel={lan.name} key={i}/> : null
                })}

            </ScrollableTabView> : null;
        return (

            <View style={styles.container}>
                {navigationBar}
                {content}


            </View>
        );
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            projectModels: [],
            favoriteKeys: [],
            isLoading: false
        }

    };

    componentDidMount() {
        this.loadData();
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            isLoadingFail: false,
            projectModels: projectModels,
        });
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData() {
        this.updateState({
            isLoading: true
        })
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepository
            .fetchNetRepository(url)
            .then(result => {
                this.updateState({
                    isLoading: false
                });
                this.items = result && result.items ? result.items : result ? result : [];
                this.flushFavoriteState()
            }).catch(error => {
            console.log(error);
            this.updateState({
                result: JSON.stringify(error),
                isLoading: false
            })
        })
    }

    renderRow(data) {
        const projectModel = data.item;
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            theme={this.props.theme}

        />


    }

    render() {
        return <View style={{flex: 1}}>
            <FlatList data={this.state.projectModels}
                      renderItem={(data) => this.renderRow(data)}
                      keyExtractor={item => "" + item.item.id}
                      refreshControl={
                          <RefreshControl
                              title='Loading...'
                              colors={['#2196F3']}
                              tintColor={'#2196F3'}
                              titleColor={'#2196F3'}
                              refreshing={this.state.isLoading}
                              onRefresh={() => this.loadData()}
                          />
                      }
            />
        </View>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'

    },

});
