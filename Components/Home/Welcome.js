import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import Performance from '../Performance/Performance';

import { getPerformances } from '../../Modules/getPerformances';

import { baseStyles } from '../../Styles/baseStyles';

/**
 * React Native component to welcome a punter to the festival when they arrive
 * and include information about the nearest next gig
 * @param {Object} props - passed properties
 * @param {Object} navigation - navigation object
 * @returns {Component}
 */
export default function Welcome(props, navigation) {

    if (!props.location) {
        return null;
    }

    useEffect(() => {
        (async() => {
            if (props.location)
                getPerformances(props.location.name)
            .then(res => {
                if (res && res[0])
                    setNextLocationPerformance(res[0])
            })
        })()
    }, [props.location])

    const [nextLocationPerformance, setNextLocationPerformance] = useState(false)
    let nextPerformance = (
        <Text style = {baseStyles.stdText}>
            No Performances Scheduled for {props.location.name}
        </Text>
    );
    if ( nextLocationPerformance ) {
        nextPerformance = (
            <View>
                <Text style = {baseStyles.stdText}>
                    Next performance at {props.location.name}:
                </Text>
                <Performance
                    performance = { nextLocationPerformance }
                    navigation = { props.navigation }
                />
            </View>
        )
    }
    return (
        <View style = {[{flex: 1, width: '100%', marginBottom: 30}, baseStyles.textTitle]}>
        <Text style = {baseStyles.stdTitle}>
            Welcome to Outer Town 2022
        </Text>
        { nextPerformance }
    </View>
    )
}