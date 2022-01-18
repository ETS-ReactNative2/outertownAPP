import React from 'react';
import { Text, View, Image } from 'react-native';
import { baseStyles } from '../../Styles/baseStyles';


const OTLogo = () => {
    return (
        <View style={{flex: 1, width: '100%', height: 200, backgroundColor: '#f4f4ec', justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style={{flex: 1, padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center'}}
                resizeMode='contain'
                source={require('../../assets/graphics/logo-road-c.png')}
            />
        </View>
    );
}


export default OTLogo