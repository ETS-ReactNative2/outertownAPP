import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { baseStyles } from '../../Styles/baseStyles';

export default function PrivacyFooter(props) {
    const navigation = props.navigation ? props.navigation : null;
    const [pressOpacity, setPressOpacity] = useState(1);
    return (
        <Pressable
            style={{
                position: 'absolute',
                bottom: -30,
                left: 0,
                height: 30,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 5,
                opacity: pressOpacity,
            }}
            onPressIn={()=>{
                setPressOpacity(0.5)
            }}
            onPressOut={()=>{
                setPressOpacity(1);
                if (navigation)
                    navigation.navigate('Privacy Policy')
            }}
        >
            <View>
                <Text style={[
                    baseStyles.stdText,
                    {color: '#f4f4ec'}
                ]}>
                    Privacy Policy &gt;&gt;&gt;
                </Text>
            </View>
        </Pressable>
    );
}