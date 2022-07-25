import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import imagesPath from './imagesPath'

const DropDown = ({ data = [], value = {}, onSelect = () => { } }) => {

    const [showOptions, setShowOptions] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropDown}
                activeOpacity={0.8}
                onPress={() => setShowOptions(!showOptions)}
            >
                <Text>{!!value ? value?.name : `Choose an option`}</Text>
                <Image source={imagesPath.dropIcon} />
            </TouchableOpacity>
            {showOptions && (<View>
                {data.map((disease, i) => {
                    return (
                        <Text key={disease.id}>{disease.name}</Text>
                    )
                })}
            </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: '90%',
        // backgroundColor: 'red'
    },
    dropDown: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
        padding: 8,
        minHeight: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
})

export default DropDown;