import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const Recorder = () => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Button color='#27aee3' style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
                </View>
            );
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header_container}>
                    <Text style={styles.title}>Respiratory Audio Analysis</Text>
                    <Text>Sound Recorder</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Text>{message}</Text>
                <Button
                    color='#eb4034'
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording} />
                {getRecordingLines()}
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_container: {
        marginTop: 40,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '20%',
        backgroundColor: '#fc7844',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    fill: {
        color: 'black',
        flex: 1,
        margin: 16
    },
    button: {
        margin: 16,
    },
});

export default Recorder;