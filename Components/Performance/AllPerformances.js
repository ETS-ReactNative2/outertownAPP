// load dependencies
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
// load components
import Loading from '../Common/Loading';
import Performance from './Performance';
import AllPerformanceHeader from './AllPerformanceHeader';
import HideAllPerformances from './HideAllPerformances';
// load modules
import { getPerformances } from '../../Modules/getPerformances';
// import parsePerformances from '../../Modules/parsePerformances';
import { baseStyles } from '../../Styles/baseStyles';

/**
 * @function AllPerformances : 
 * React Native component for displaying a list of all performances
 * @param {Object} props 
 * @returns {Component}
 */
export default function AllPerformances(props) {
    const [showModal, setShowModal] = useState(props.showAllPerformances);
    const [performances, setPerformances] = useState(false);
    const [allPerformances, setAllPerformances] = useState(false);
    const [search, setSearch] = useState('');
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [deactivatePressables, setDeactivatePressables] = useState(false);
    const navigation = useNavigation();

    function updateSearch(search) {
        const re = new RegExp(search, 'i');
        setPerformances(allPerformances.filter(performance => {
            return re.test(performance.Band);
        }));
        setSearch(search);
    }

    function swipeCancelled(e) {
        setScrollEnabled(true);
        setDeactivatePressables(false);
        props.setShowAllPerformances(true);
        setShowModal(true);
    }

    const toggleModal = () => {
        setScrollEnabled(true);
        setDeactivatePressables(false);
        props.setShowAllPerformances(false);
        setShowModal(false);
    };

    useEffect(() => {
        (async() => {
            // get venue data from local storage
            // TODO filter performances to only those whose end time is after now
            let localPerformancesData = await getPerformances();
            setPerformances(localPerformancesData);
            setAllPerformances(localPerformancesData);
        })();
    }, []);

    useEffect(() => {
        setShowModal(props.showAllPerformances);
    }, [props.showAllPerformances]);
    
    // build schedule
    let performanceSchedule;
    if (!performances)
        return <Loading />;
    else if (performances.length === 0) {
        performanceSchedule = <Performance
            performance={{
                Band: 'No bands fit the search',
                Stage: '',
                StartSting: '',
                EndString: '',
            }}
            toggleModal={null}
            key={1}
        />
    } else {
        performanceSchedule = performances.map((performance)=><Performance
                navigation={navigation}
                performance={performance}
                toggleModal={toggleModal}
                key={performance.Id}
                deactivatePressables={deactivatePressables}
            />)
    }
    return (
        <Modal
            isVisible={showModal}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            swipeDirection='right'
            onSwipeStart={()=>{
                setScrollEnabled(false);
                setDeactivatePressables(true);
            }}
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
            <ScrollView
                contentContainerStyle={{zIndex:0}}
                scrollEnabled={scrollEnabled}
            >
                <SafeAreaView>
                    <SearchBar
                        placeholder='Search bands...'
                        onChangeText={updateSearch}
                        value={search}
                        containerStyle={{backgroundColor: 'transparent'}}
                        inputContainerStyle={{backgroundColor: '#ffffff'}}
                        inputStyle={baseStyles.stdText}
                    />
                    <AllPerformanceHeader />
                    {performanceSchedule}
                    <HideAllPerformances
                        toggleModal={toggleModal}
                        deactivatePressables={deactivatePressables}
                    />
                </SafeAreaView>
            </ScrollView>
        </Modal>
    );
  }