// load dependencies
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// load components
import Loading from './Loading';
import Performance from './Performance';
// load modules
import parsePerformances from '../Modules/parsePerformances';

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
        performanceSchedule =
        <FlatList
            data={performances}
            renderItem={({ item }) => Performance(item, navigation, toggleModal)}
            keyExtractor={item=>item.Id}
        />
    }
    return (
        <Modal
            isVisible={showModal}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            swipeDirection='up'
            onSwipeComplete={modalSwiper}
            swipeThreshold={155}
            backdropColor='#eeeeee'
            backdropOpacity={0.9}
            onBackButtonPress={toggleModal}
            style={{backgroundColor: '#996622'}}
        >
            <SafeAreaView
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
                {performanceSchedule}
                <Button title="Hide modal" onPress={toggleModal} />
            </SafeAreaView>
        </Modal>
    );
  }