// load dependencies
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
    const navigation = useNavigation();

    function updateSearch(search) {
        const re = new RegExp(search, 'i');
        setPerformances(allPerformances.filter(performance => {
            return re.test(performance.Band);
        }));
        setSearch(search);
    }

    const toggleModal = () => {
        props.setShowAllPerformances(false);
        setShowModal(false);
    };

    useEffect(() => {
        (async() => {
            // get venue data from local storage
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
                StartString: '',
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
            />)
    }
    return (
        <Modal
            isVisible={showModal}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            backdropColor='#eeeeee'
            backdropOpacity={0.9}
            onBackButtonPress={toggleModal}
            style={{zIndex: 1}}
            accessibilityActions={[{ name: 'activate', label: 'View or hide full gig schedule' }]}
            onAccessibilityAction={({ nativeEvent }) => {
                if (nativeEvent.actionName === 'activate') {
                    props.setShowAllPerformances(!props.showAllPerformances)
                    setShowModal(!showModal)
                }
            }}
            propagateSwipe={true}
        >
            <ScrollView
                contentContainerStyle={{zIndex:0}}
                keyboardDismissMode='on-drag'
                scrollEventThrottle={32}
            >
                <SafeAreaView>
                    <HideAllPerformances
                        toggleModal={toggleModal}
                    />
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
                    />
                </SafeAreaView>
            </ScrollView>
        </Modal>
    );
  }