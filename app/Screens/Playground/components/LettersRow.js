import React from 'react';
import {styles} from "../styles";
import LetterButton from "./LetterButton";
import {View} from "react-native";

export default function LettersRow(props) {

    const { row, last, setLetter } = props;

    return (
        <View style={{...styles.lettersRow, marginBottom: last ? 0 : 10}}>
            {row.map((letter, letterIndex, letters) => (
                <LetterButton
                    letter={letter}
                    last={letterIndex !== letters.length - 1}
                    setLetter={setLetter}
                />
            ))}
        </View>
    )
}