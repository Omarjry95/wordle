import React, {useState, useEffect, useRef, createRef} from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from "./styles";

export default function Playground() {

    const inputsRef = useRef(Array.from({ length: 25 }, (v, k) => k).map((i) => createRef()));

    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [words, setWords] = useState([Array.from({ length: 5 }, (v, k) => '')]);

    useEffect(() => {
        if (!(isNaN(row) && isNaN(column))) {
            inputsRef?.current[row * 5 + column].current?.focus();
        }
    }, [row, column]);

    const generateItemsByNumber = () => {
        return Array.from({ length: 5 }, (v, k) => k);
    }

    const matrixXY = generateItemsByNumber();

    const getYCustomStyle = (index, array) => {
        return {
            marginBottom: index !== array.length - 1 ? 10 : 0
        }
    }

    const getXCustomStyle = (yIndex, xIndex, array) => {
        return {
            marginRight: xIndex !== array.length - 1 ? 10 : 0,
            backgroundColor: yIndex <= row ? 'white' : 'rgba(255, 255, 255, 0.2)',
            borderColor: yIndex === row ? 'black' : 'white'
        }
    }

    const setLetter = (letter, yIndex, xIndex) => {
        let newWords = JSON.parse(JSON.stringify(words));

        newWords[yIndex][xIndex] = letter.length ? letter.charAt(letter.length - 1).toUpperCase() : '';

        setWords(newWords);

        if (letter.length > 0) {
            setColumn(column + 1 > 4 ? 0 : column + 1);
        }
    }

    const adaptSelection = (yIndex, xIndex) => {
        const position = words[yIndex] ? words[yIndex][xIndex].length : 0;

        return { start: position, end: position };
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputGroup}>
                {matrixXY.map((y, yIndex, yArray) => (
                    <View style={{...styles.inputRow, ...getYCustomStyle(yIndex, yArray) }}>
                        {matrixXY.map((x, xIndex, xArray) => (
                            <View style={{...styles.letterDisc, ...getXCustomStyle(yIndex, xIndex, xArray)}}>
                                <TextInput
                                    caretHidden={false}
                                    ref={inputsRef?.current[yIndex * 5 + xIndex]}
                                    style={styles.textInput}
                                    value={words[yIndex] ? words[yIndex][xIndex] : ''}
                                    onChangeText={(letter) => setLetter(letter, yIndex, xIndex)}
                                    maxLength={1}
                                    selection={adaptSelection(yIndex, xIndex)}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </KeyboardAvoidingView>
    )
}