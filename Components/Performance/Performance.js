// import dependencies
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import styles
import { giglistStyles } from '../../Styles/giglistStyles';

export default function Performance(props) {
    const navigation=props.navigation;
    const performance=props.performance;
    const toggleModal = props.toggleModal ? props.toggleModal : false;
    return (
        <View style={giglistStyles.gigRow}>
            <View style={giglistStyles.venue}>
                <Text style={giglistStyles.textVenue}>
                    {performance.Stage}
                </Text>
            </View>
            <View style={giglistStyles.band}>
            <TouchableOpacity
                onPress={() => {
                    if (toggleModal)
                        toggleModal();
                    navigation.navigate('Band Info', {
                            band: performance.Band
                        })}
                }
            >
                    <Text style={giglistStyles.text}>
                        {performance.Band}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={giglistStyles.time}>
                <Text style={giglistStyles.textSmall}>
                    {performance.StartSting} - {performance.EndString}
                </Text>
            </View>
        </View>
    )
}