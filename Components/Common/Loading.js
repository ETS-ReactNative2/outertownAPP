import React, { useRef, useEffect } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import styles
import { baseStyles } from '../../Styles/baseStyles';

/**
 * @function Loading : 
 * React Native component for displaying animated screen while data is loading asynchronously
 * @returns {Component}
 */
export default function Loading() {
    const aniX = useRef(new Animated.Value(-800)).current;
    const textFade = useRef(new Animated.Value(0)).current;
    const containerFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(containerFade, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(aniX, {
                toValue: -1850,
                duration: 5000,
                useNativeDriver:false,
            }),
            Animated.timing(textFade, {
                toValue: 0.8,
                duration: 2500,
                useNativeDriver: false,
            }),
        ]).start();
    })

    return (
        <SafeAreaView>
            <Animated.View
                style={[{backgroundColor: '#f4f4ec', justifyContent: 'center', alignItems: 'center', height: '100%'}, {opacity: containerFade}]}
            >
                <Animated.View
                    style={{
                        padding: '15%',
                        backgroundColor: '#00000099',
                        borderRadius: 25,
                        zIndex: 2,
                        opacity: textFade,
                    }}
                >
                    <Text style={{color: '#ffffff'}}>
                        Loading...
                    </Text>
                </Animated.View>
                <Animated.Image
                    source={require('../../assets/graphics/road-bg-long.png')}
                    resizeMode='contain'
                    style={[baseStyles.imageBackgroundStyle, {position: 'absolute', top:aniX}]}
                    imageStyle={baseStyles.imageBackgroundImageStyle}
                >

                </Animated.Image>
            </Animated.View>
        </SafeAreaView>
    )
}