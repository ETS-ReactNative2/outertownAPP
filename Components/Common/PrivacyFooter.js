import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { baseStyles } from '../../Styles/baseStyles';

/**
 * React Native component for displaying link to privacy policy
 * @param {Object} props - passed properties
 * @returns {Component}
 */
export default function PrivacyFooter(props) {
    const navigation = props.navigation ? props.navigation : null;
    const [pressOpacity, setPressOpacity] = useState(1);
    return (
        <Pressable
            style={[baseStyles.privacy, {
                opacity: pressOpacity,
            }]}
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