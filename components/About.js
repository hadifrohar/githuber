import React from 'react';
import {Text, View, Linking, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import * as about from '../assets/about'
import {COLORS} from '../utils/utils';
import {deleteUser, saveUser} from '../redux/Actions';
import ListComponent from './ListComponent';

const AboutMe = () => (
    <Card title={about.me.name} image={{uri: about.me.image}} imageProps={{resizeMode: 'center', borderRadius: 10}} >
        <Text style={{textAlign: 'center'}}>{about.me.description}</Text>
        <View style={{alignItems: 'center'}}>
            <Icon name={'linkedin'} type="font-awesome" color={COLORS.DARK_COLOR} reverse
                  onPress={() => Linking.openURL(about.me.url)}
            />
        </View>
    </Card>
);

const renderProject = ({item, index}) => (
    <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
        <Card image={{uri: item.image}} imageProps={{resizeMode: 'stretch'}}
              featuredTitle={item.name}>
            <Text style={{fontSize: 12, fontWeight: 'bold', alignSelf: 'center'}}>{item.status}</Text>
            <Text>{item.description}</Text>

        </Card>
    </TouchableOpacity>
);


function About() {

    return (
        <ScrollView>
            <AboutMe/>
            <ListComponent title='Projects' data={{data: about.projects, loading: false}} renderItem={renderProject}/>
        </ScrollView>
    );
}

export default About
