// load dependencies
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// load components
import Loading from '../Common/Loading';
import Performance from './Performance';
import AllPerformanceHeader from './AllPerformanceHeader';
import HideAllPerformances from './HideAllPerformances';
// load modules
import parsePerformances from '../../Modules/parsePerformances';

/**
 * @function AllPerformances : 
 * React Native component for displaying a list of all performances
 * @param {Object} props 
 * @returns {Component}
 */
export default function AllPerformances(props) {
    const [showModal, setShowModal] = useState(props.showAllPerformances);
    const [performances, setPerformances] = useState(false);

    const navigation = useNavigation();

    function swipeCancelled(e) {
        props.setShowAllPerformances(true);
        setShowModal(true);
    }

    const toggleModal = () => {
        props.setShowAllPerformances(false);
        setShowModal(false);
    };

    useEffect(() => {
        (async() => {
            // get venue data from local storage
            // TODO filter performances to only those whose end time is after now
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
    else if (performances.length === 0)
        return null
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
            onSwipeCancel={swipeCancelled}
            onSwipeComplete={toggleModal}
            swipeThreshold={155}
            backdropColor='#eeeeee'
            backdropOpacity={0.9}
            onBackButtonPress={toggleModal}
            style={{zIndex: 1}}
            accessibilityActions={[{ name: 'activate', label: 'View or hide full gig schedule' }]}
            onAccessibilityAction={({ nativeEvent }) => {
                if (nativeEvent.actionName === 'activate') {
                    setShowAllPerformances(!props.showAllPerformances)
                    setShowModal(!showModal)
                }
            }}
        >
            <ScrollView>
                <SafeAreaView>
                    <AllPerformanceHeader />
                    {performanceSchedule}
                    <HideAllPerformances
                        toggleModal={toggleModal}
                    />
                </SafeAreaView>
            </ScrollView>
        </Modal>
    );
  }