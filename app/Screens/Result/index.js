import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Result() {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.text}>Incroyable ! du premier coup ? Est-ce un coup d'hasard ?</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Je veux découvrir mon cadeau du jour</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}