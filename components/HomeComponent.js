import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Input, Card, Button} from 'react-native-elements';
import {COLORS} from'../utils/utils'
import {deleteUser, getUserData} from '../redux/Actions';
import {useDispatch, useSelector} from 'react-redux'
import ListComponent from './ListComponent';
import Loading from './LoadingComponent';


function SearchComponent({navigation}) {

    const isLoading = useSelector(state => state.userDetails.loading);
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    return(
        <Card featuredTitle='GitHub Search'>
            <Input placeholder='Username' leftIcon={{name: 'user', type: 'font-awesome', color: COLORS.DARK_COLOR}}
                   value={username} onChangeText={(username) => setUsername(username)}/>
            <Button title='Search' buttonStyle={{backgroundColor: COLORS.DARK_COLOR, opacity: 0.9}}
                   onPress={() => showUser(dispatch, navigation, username)}
           />
            <Loading loading={isLoading}/>

        </Card>
    );
}

const showUser = (dispatch, navigation, username) => {
    if(username.trim().length > 0)
        dispatch(getUserData(username)).then(valid => {
            if(valid)
                navigation.navigate('UserDetails');
        })
}


const renderSavedItem = (index, username, dispatch, navigation) => (
    <TouchableOpacity key={index} style={{margin: 10}} onPress={() => showUser(dispatch, navigation, username)}
                      onLongPress={() =>
                          Alert.alert('Delete saved', 'Would you like to delete ' + username + ' from saved list?',
                              [{text:'No', style:'cancel'}, {text:'Yes', onPress: ()=> dispatch(deleteUser(username))}],

                          )}
    >
        <Text style={{fontSize: 16, alignSelf: 'center'}}>{username}</Text>
    </TouchableOpacity>
);


function Home({navigation }) {

    const savedUsers = useSelector(state => state.savedUsers);
    const dispatch = useDispatch();
    return(
        <ScrollView>
            <SearchComponent navigation={navigation}/>
            <ListComponent title={"Saved users"} data={{data: savedUsers, loading: false}}
                           renderItem={({index, item}) => renderSavedItem(index, item, dispatch, navigation)}/>
        </ScrollView>
    )
}
export default Home
