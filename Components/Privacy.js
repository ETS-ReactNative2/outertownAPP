import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseStyles } from '../Styles/baseStyles';
import LinkWrapper from './Common/LinkWrapper';

/**
 * React Native component to display the app privacy policy
 * @returns {Component}
 */
export default function PrivacyPolicy() {
    return (
        <ScrollView
            style={baseStyles.content}
        >
            <View style={baseStyles.container}>
                <View style={baseStyles.contentContainer}>
                    <View style={baseStyles.textTitle}>
                        <Text style={baseStyles.stdTitle}>
                            Outer Town Festival App - Privacy Policy
                        </Text>
                    </View>
                    <View style={baseStyles.textContainer}>
                        <Text style={baseStyles.stdText}>
                            We collect no identifiable personal information about you whatsoever. The only information the app collects (with your permission) is:{`\n\n`}
                            - your location, so we can greet you when you arrive at the festival - no information about where you are leaves your phone or is shared with us.{`\n`}
                            - bands that you have liked - this isn't connected with your identiity in any way, we only collect anonymous likes to better assess which bands are popular with festival goers.{`\n`}
                            - a token from your phone so we can send you notifications when a band you have liked is about to play{`\n\n`}
                            This is transmitted to our server and stored securely until the notification is sent, at which point it is deleted. We store which bands have been liked, but completely anonymously.{`\n\n`}
                            The app downloads current information about the festival from the internet as needed.{`\n\n`}
                            This is app is built with Expo, and that tool may request your Android / Apple Advertising ID, though this code may not end up being executed. Find out more at
                            <LinkWrapper
                                accessible={true}
                                accessibilityLabel={`External link to email Outer Town Festival with any concerns about the app`}
                                url={"https://expo.dev/privacy-explained"}
                                linkComponent={
                                        <Text style={[baseStyles.stdText, {textDecorationLine: 'underline'}]}>
                                            https://expo.dev/privacy-explained
                                        </Text>
                                }
                            />{`\n\n`}
                            Feel free to get in touch with any concerns:
                            <LinkWrapper
                                accessible={true}
                                accessibilityLabel={`External link to email Outer Town Festival with any concerns about the app`}
                                url={"mailto:outertownfest.gmail.com"}
                                linkComponent={
                                        <Text style={[baseStyles.stdText, {textDecorationLine: 'underline'}]}>
                                            outertownfest@gmail.com
                                        </Text>
                                }
                            />
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}