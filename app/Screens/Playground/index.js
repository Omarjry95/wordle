import React, {useState, useMemo, useEffect} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from "./styles";
import {getMatrix} from "./utils";
import {theme} from "../../Design/theme";
import usePrevious from "../../Utils/Hooks/UsePrevious";
import FakeKeyboard from "./components/FakeKeyboard";
import PlaygroundEnvironment from "./components/PlaygroundEnvironment";
import {getDatabase, ref, set} from "firebase/database";
import {useSelector} from "react-redux";
import {authSelector} from "../../Auth/authSlice";

export default function Playground(props) {

    const { navigation } = props;

    const [currentWord, updateCurrentWord] = useState(undefined);
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [words, setWords] = useState(getMatrix(5, ''));
    const [winner, setWinner] = useState(false);

    const { user } = useSelector(authSelector);

    const { id: userId } = user;

    const isSubmitDisabled = () => { return !words.every((l) => l.length); }

    const buttonStyle = useMemo(() => {
        return {
            borderColor: isSubmitDisabled() ? 'gray' : 'black',
            elevation: isSubmitDisabled() ? 0 : 6
        }
    }, [row, words]);

    const buttonTextStyle = useMemo(() => {
        return { color: isSubmitDisabled() ? 'gray' : 'black' }
    }, [row, words]);

    const previousWords = usePrevious(words);

    useEffect(() => {
        if (words && previousWords) {
            let newColumn = column;

            if (words[column].length) {
                newColumn = newColumn + 1;

                newColumn = newColumn > 4 ? 0 : newColumn;
            }
            else if (words[column] === previousWords[column]) {
                newColumn = newColumn - 1;

                newColumn = newColumn < 0 ? 4 : newColumn;
            }

            setColumn(newColumn);
        }
    }, [words]);

    const getYCustomStyle = (index, array) => {
        return { marginBottom: index !== array.length - 1 ? 10 : 0 }
    }

    const getBackground = (yIndex, xIndex) => {
        let background = 'white';

        if (yIndex < row) {
            const mysteryChars = currentWord.name.split('');

            if (currentWord.steps[yIndex][xIndex].toLowerCase() === mysteryChars[xIndex].toLowerCase()) {
                background = theme.secondaryColor;
            }
            else if (mysteryChars.findIndex((c) => c === currentWord.steps[yIndex][xIndex].toLowerCase()) !== -1) {
                background = theme.thirdColor;
            }
        }
        else if (yIndex === row && xIndex === column) {
            background = 'rgba(0, 0, 0, 0.1)';
        }

        return background;
    }

    const getXCustomStyle = (yIndex, xIndex, array) => {
        return {
            marginRight: xIndex !== array.length - 1 ? 10 : 0,
            backgroundColor: yIndex > row ? 'rgba(255, 255, 255, 0.2)' : getBackground(yIndex, xIndex),
            borderColor: yIndex > row ? 'white' : 'black'
        }
    }

    const setLetter = (letter) => {
        let newWords = JSON.parse(JSON.stringify(words));

        newWords[column] = letter;

        setWords(newWords);
    }

    const getInnerLetter = (yIndex, xIndex) => {
        const innerLetter = '';

        if (yIndex < row) {
            return currentWord.steps[yIndex][xIndex];
        }
        else if (yIndex === row) {
            return words[xIndex];
        }

        return innerLetter;
    }

    const onSubmitWord = () => {
        if (words.join('').toLowerCase() === currentWord.name) {
            setWinner(true);

            return;
        }

        if (row + 1 > 4) {
            return;
        }

        set(ref(getDatabase(), 'words/' + currentWord.id + '/solvers/' + userId + '/steps'), [...currentWord.steps, words]);
    }

    const playgroundEnvironmentProps = {
        currentWordState: currentWord,
        currentTry: words,
        updateCurrentWord, setRow, setColumn, setWords, winner, navigation
    }

    return (
        <PlaygroundEnvironment
            {...playgroundEnvironmentProps}
        >
            {currentWord ?
                (<View style={styles.container}>
                    <View style={styles.playgroundContainer}>
                        <View style={styles.inputGroup}>
                            {getMatrix(5).map((y, yIndex, yArray) => (
                                <View style={{...styles.inputRow, ...getYCustomStyle(yIndex, yArray) }}>
                                    {getMatrix(5).map((x, xIndex, xArray) => (
                                        <TouchableOpacity
                                            style={{...styles.letterDisc, ...getXCustomStyle(yIndex, xIndex, xArray)}}
                                            activeOpacity={1}
                                            onPress={() => setColumn(xIndex)}
                                        >
                                            <Text style={styles.textDisplay}>
                                                {getInnerLetter(yIndex, xIndex)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={{...styles.button, ...buttonStyle }}
                            disabled={isSubmitDisabled()}
                            onPress={() => onSubmitWord()}
                        >
                            <Text style={{...styles.buttonText, ...buttonTextStyle }}>
                                Je confirme
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FakeKeyboard setLetter={setLetter} />
                </View>)
                :
                (<View style={styles.container} />)}
        </PlaygroundEnvironment>
    )
}