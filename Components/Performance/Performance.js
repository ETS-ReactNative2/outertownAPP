// import dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
// import componnents
import ItemLoading from '../Common/ItemLoading';
// import functions
import { getBandInfo } from '../../Modules/getBandInfo'
// import styles
import { giglistStyles } from '../../Styles/giglistStyles';

/**
 * @function Performance :
 * React Native component for displaying information about a performance
 * @param {Object} props 
 * @returns {Component}
 */
export default function Performance(props) {
    useEffect(() => {
        (async() => {
            const bandInfo = await getBandInfo(props.performance.Band);
            setSecretBand(bandInfo?.Secret == true);
            setPerformanceReady(true);
        })()
    })
    const [performanceReady, setPerformanceReady] = useState(false);
    const [pressOpacity, setPressOpacity] = useState(1);
    const [secretBand, setSecretBand] = useState(false)
    const navigation = props.navigation ? props.navigation : null;
    const performance = props.performance;
    if (!performance) return null;
    if (performance.Secret === "1") return null;
    const toggleModal = props.toggleModal ? props.toggleModal : false;
    const deactivatePressables = props.deactivatePressables ? props.deactivatePressables : false;
    let bandName = <Text style={giglistStyles.text}>
                        {secretBand ? 'Secret Performance' : performance.Band}
                    </Text>;
    if (navigation && !secretBand) {
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
    if (!performanceReady) return <ItemLoading />
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
                    {performance.StartString} - {performance.EndString}
                </Text>
            </View>
        </View>
    )
}