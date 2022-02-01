import React from 'react';
import { View, Image } from 'react-native';

/**
 * @function OTLogo : 
 * React Native component for displaying festival logo
 * @returns {Component}
 */
const OTLogo = () => {
    return (
        <View style={{flex: 1, width: '100%', height: 200, backgroundColor: '#f4f4ec', justifyContent: 'center', alignItems: 'center'}}>
            <Image
                accessible={true}
                accessibilityLabel='Logo for Outer Town Festival'
                style={{flex: 1, padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center'}}
                resizeMode='contain'
                source={require('../../assets/graphics/logo-road-c.png')}
            />
        </View>
    );
}


export default OTLogo