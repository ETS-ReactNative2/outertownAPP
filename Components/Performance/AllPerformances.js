// load dependencies
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// load components
import Loading from '../Common/Loading';
import Performance from './Performance';
// load modules
import parsePerformances from '../../Modules/parsePerformances';
// import styles
import { baseStyles } from '../../Styles/baseStyles';

export default function AllPerformances(props) {
    const [showModal, setShowModal] = useState(props.showAllPerformances);
    const [performances, setPerformances] = useState(false);

    const navigation = useNavigation();

    function modalSwiper({nativeEvent}) {
        toggleModal()
    }

    const toggleModal = () => {
        props.setShowAllPerformances(!showModal)
    };

    useEffect(() => {
        (async() => {
            // get venue data from local storage
            const localPerformancesData = await AsyncStorage.getItem('@performancesData');
            setPerformances(parsePerformances(localPerformancesData));
        })();
    }, []);

    useEffect(() => {
        setShowModal(props.showAllPerformances);
    }, [props.showAllPerformances]);
    
    // build schedule
    let performanceSchedule;
    if (!performances)
        performanceSchedule = <Loading />;
    else {
        performanceSchedule = performances.map((performance)=><Performance
                navigation={navigation}
                performance={performance}
                toggleModal={toggleModal}
                key={performance.Id}
            />)
    }
    return (
        <Modal
            isVisible={showModal}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            swipeDirection='right'
            onSwipeComplete={modalSwiper}
            swipeThreshold={100}
            backdropColor='#eeeeee'
            backdropOpacity={0.9}
            onBackButtonPress={toggleModal}
        >
            <ScrollView>
                <SafeAreaView
                    style={{flex: 25, alignItems: 'center', justifyContent: 'center'}}
                >
                        <Text style={baseStyles.stdTitle}>
                            Full Gig Schedule
                        </Text>
                        {performanceSchedule}
                        <View style={{flex:1, backgroundColor: '#f4f4ec'}}>
                            <Button title="Hide Giglist" onPress={toggleModal} />
                        </View>
                </SafeAreaView>
            </ScrollView>
        </Modal>
    );
  }