// import dependencies
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
// import styles
import { giglistStyles } from '../../Styles/giglistStyles';

/**
 * @function Performance :
 * React Native component for displaying information about a performance
 * @param {Object} props 
 * @returns {Component}
 */
export default function Performance(props) {
    const [pressOpacity, setPressOpacity] = useState(1);
    const navigation = props.navigation ? props.navigation : null;
    const performance = props.performance;
    const toggleModal = props.toggleModal ? props.toggleModal : false;
    const deactivatePressables = props.deactivatePressables ? props.deactivatePressables : false;
    let bandName = <Text style={giglistStyles.text}>
                        {performance.Band}
                    </Text>;
    if (navigation) {
        bandName = <Pressable
            accessible={true}
            accessibilityLabel={`Navigate to information page for band ${performance.Band}`}
            disabled={deactivatePressables}
            onPressIn={() => setPressOpacity(0.2)}
            onPressOut={() => {
                setPressOpacity(1);
                if (toggleModal)
                    toggleModal();
                navigation.navigate('Band Info', {
                        band: performance.Band
                    })}
                }
            >
            <View style={{opacity: pressOpacity}}>
                <Text style={giglistStyles.text}>
                    {performance.Band} &gt;&gt;
                </Text>
            </View>
        </Pressable>
    }
    return (
        <View
            accessible={true}
            accessibilityLabel={`Details of a performance`}
            style={giglistStyles.gigRow}
        >
            <View style={giglistStyles.venue}>
                <Text style={giglistStyles.textVenue}>
                    {performance.Stage}
                </Text>
            </View>
            <View style={giglistStyles.band}>
                {bandName}
            </View>
            <View style={giglistStyles.time}>
                <Text style={giglistStyles.textSmall}>
                    {performance.StartSting} - {performance.EndString}
                </Text>
            </View>
        </View>
    )
}