import React from 'react';
import { View, Text } from 'react-native';
import { baseStyles } from '../Styles/baseStyles';

export default function PrivacyPolicy() {
    return (
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
                        - a token from your phone so we can send you notifications when a band you have liked is about to play{`\n\n`}
                        This is transmitted to our server and stored securely until the notification is sent, at which point it is deleted. We store which bands have been liked, but completely anonymously.{`\n\n`}
                        We may ask for permission to know your GPS coordinates so we can greet you when you arrive at the festival via a notification using the same token, but no information about where you are leaves your phone or is shared with us.{`\n\n`}
                        Feel free to get in touch with any concerns: outertownfest@gmail.com
                    </Text>
                </View>
            </View>
        </View>
    );
}