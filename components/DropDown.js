import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import imagesPath from './imagesPath'

const DropDown = ({ data = [], value = {}, onSelect = () => { } }) => {

    const [showOptions, setShowOptions] = useState(false);
    const onSelectedItem = (disease) => {
        setShowOptions(false);
        onSelect(disease);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropDown}
                activeOpacity={0.8}
                onPress={() => setShowOptions(!showOptions)}
            >
                <Text>{!!value ? value?.name : `Choose an option`}</Text>
                <Image style={{
                    transform: [{rotate: showOptions? '180deg': '0deg'}]
                }}
                    source={imagesPath.dropIcon}
                />
            </TouchableOpacity>
            {showOptions && (<View>
                {data.map((disease, i) => {
                    return (
                        <TouchableOpacity
                            style={{
                                backgroundColor: value.id == disease.id ? '#fc7844' : 'white',
                                paddingVertical: 8,
                                borderRadius: 4,
                                paddingHorizontal: 6 
                            }}
                            key={disease.id}
                            onPress={() => onSelectedItem(disease)}
                        >
                            <Text>{disease.name}</Text>
                        </TouchableOpacity>
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
        flexDirection: 'row',
        marginBottom: 8
    },
})

export default DropDown;