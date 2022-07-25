import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Image, Button } from "react-native";
import DropDown from './DropDown';
import imagesPath from './imagesPath'

let diseases = [
    { id: 1, name: 'Bronchiectasis', perc: '20%' },
    { id: 2, name: 'URTI', perc: '30%' },
    { id: 3, name: 'Pneumonia', perc: '15%' },
]

const Result = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const onSelect = (item) => {
        setSelectedItem(item);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header_container}>
                    <Text style={styles.title}>Respiratory Audio Analysis</Text>
                    <Text>Results</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Image source={imagesPath.diagramImg} style={{
                    height: 200,
                    width: 200,
                    // backgroundColor: 'red'
                }} />
                <View style={styles.row1}>
                    <View style={styles.row1_col1}>
                        <Text style={styles.row1_title}>COPD you have:</Text>
                        <Text style={styles.row1_precent}>50%</Text>
                    </View>
                </View>
                <View style={styles.row2}>
                    <DropDown
                        value={selectedItem}
                        data={diseases}
                        onSelect={onSelect}
                    />
                </View>
                {/* <ActivityIndicator size='large' /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        justifyContent: 'center',
        // position: 'absolute',
        // top: 0,
    },
    body: {
        width: '100%',
        height: '80%',
        // backgroundColor: '#ffa',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    row1: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        padding: 10
    },
    // row2: {
    //     width: '100%',
    //     backgroundColor: 'yellow',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     height: 150,
    // },
    row1_col1: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        marginTop: 20
    },
    row1_title: {
        fontSize: 18,
        marginBottom: 10
    },
    row1_precent: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default Result;