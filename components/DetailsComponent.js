import React, {useEffect} from 'react';
import {Text, View, Linking, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Icon} from 'react-native-elements';
import ListComponent from './ListComponent';
import {COLORS} from '../utils/utils';
import {getReposData, saveUser, deleteUser} from '../redux/Actions';

function UserDetails({data}) {
    const dispatch = useDispatch();
    const saved = useSelector(state => state.savedUsers).some(username => username === data.username);
    return(
        <Card title={data.name}
              image={{uri: data.image}}
              containerStyle={{alignItems: 'center'}}
              imageProps={{resizeMode: 'contain', borderRadius: 10}}>
            {/*<Icon name={props.favorite ? 'heart' : 'heart-o'}*/}
            <Text style={{fontSize: 18}}>{data.description}</Text>
            <View style={{alignItems: 'center'}}>
                <Icon name={saved ? 'heart' : 'heart-o'} type="font-awesome" color={COLORS.DARK_COLOR} reverse
                      onPress={() => saved ? dispatch(deleteUser(data.username)) : dispatch(saveUser(data.username))}
                />
            </View>

        </Card>
    );
}

const renderRepoItem = ({item, index}) => (
    <TouchableOpacity key={index} style={{margin: 10}} onPress={() => Linking.openURL(item.url)}>
        <Text style={{fontSize: 16, alignSelf: 'center'}}>{item.name}</Text>
        <Text style={{fontSize: 14}}>{(item.description === null ? '' : item.description+'  -  ') + "Language: "+item.language}</Text>
        <Text style={{fontSize: 12}}>Last update: {new Date(item.updated).toDateString()}</Text>
    </TouchableOpacity>
);


export default function Details({navigation}) {
    const userData = useSelector(state => state.userDetails);
    const reposData = useSelector(state => state.reposData);

    const dispatch = useDispatch();
    useEffect(() => {
         navigation.setOptions({title: userData.data.username})
         dispatch(getReposData(userData.data.repos_url))
    }, [])

    return(
        <ScrollView>
            <UserDetails data={userData.data} />
            <ListComponent title={"Repos"} data={reposData} renderItem={renderRepoItem}/>
        </ScrollView>)
}

