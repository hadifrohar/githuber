import {ActivityIndicator} from 'react-native';
import {COLORS} from '../utils/utils';
import React from 'react';


export default function Loading({loading}) {

    if(loading)
        return(<ActivityIndicator size="large" color={COLORS.DARK_COLOR}
                                  style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/>)
    else
        return(null);
}
