import React from 'react';
import {styles} from "../styles";
import {Text, TouchableOpacity} from "react-native";

export default function LetterButton(props) {

    const { letter, last, setLetter } = props;

    return (
        <TouchableOpacity
            style={{...styles.letterContainer, marginRight: last ? 5 : 0 }}
            onPress={() => setLetter(letter)}
        >
            <Text style={styles.letterText}>
                {letter}
            </Text>
        </TouchableOpacity>
    )
}