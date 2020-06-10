import React from 'react';
import {FlatList, View} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import Loading from './LoadingComponent';
import {COLORS} from '../utils/utils';



export default function ListComponent({title, data, renderItem}) {

    const lineSeparator = () => (<Divider style={{backgroundColor: 'gray'}} />);
    const loading = data.loading;
    return(
            <Card title={title}>
                <Loading loading={loading}/>
                <FlatList data={data.data} renderItem={renderItem}
                          nestedScrollEnabled keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={lineSeparator}/>
            </Card>

    );
}
