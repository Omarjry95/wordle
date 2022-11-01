import React, {useMemo, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Modal, ActivityIndicator, ImageBackground} from 'react-native';
import { styles } from "./styles";
import {getMatrix} from "./utils";
import {theme} from "../../Design/theme";
import usePrevious from "../../Utils/Hooks/UsePrevious";
import FakeKeyboard from "./components/FakeKeyboard";
import {getDatabase, ref, set, child, get} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../Auth/authSlice";
import {initPlayground, playgroundSelector, setPlaygroundState} from "./playgroundSlice";
import {statusSelector} from "../../Auth/statusSlice";
import {sceneSelector} from "../../Auth/sceneSlice";
import {getTodayDateFormatted} from "../../Utils/Date/dateUtils";

export default function Playground(props) {

    const { navigation } = props;

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const { user } = useSelector(authSelector);
    const { status } = useSelector(statusSelector);
    const { scenes } = useSelector(sceneSelector);
    const { currentWord, row, column, letters, winner, allWords } = useSelector(playgroundSelector);

    const { id: userId } = user;

    const currentStatus = useMemo(() => status.find((s) => s.value === "CURRENT"), [status]);
    const doneStatus = useMemo(() => status.find((s) => s.value === "DONE"), [status]);
    const isSubmitDisabled = useMemo(() => !letters.every((l) => l.length), [letters]);

    const buttonStyle = useMemo(() => {
        return {
            borderColor: isSubmitDisabled ? 'gray' : 'black',
            elevation: isSubmitDisabled ? 0 : 6
        }
    }, [row, letters]);

    const previousLetters = usePrevious(letters);

    const getWordsObserver = async () => {
        const wordsSnapshot = await get(child(ref(getDatabase()), 'words'));

        if (wordsSnapshot.exists()) {
            const wordsBySnapshot = wordsSnapshot.val();

            const words = Object.keys(wordsBySnapshot).map((key) => {
                return { id: key, ...wordsBySnapshot[key] }
            });

            dispatch(setPlaygroundState({ currentWord, row, column, letters, winner,
                allWords: words
            }))
        }

        setLoading(false);
    }

    useEffect(() => {
        getWordsObserver();

        return () => { dispatch(initPlayground()); }
    }, []);

    useEffect(() => {
        const pendingWord = allWords.find((word) => word.solvers && word.solvers[userId] && word.solvers[userId].status === currentStatus.id);

        if (pendingWord) {
            const { id: currentWordId, name, solvers } = pendingWord;
            const steps = solvers[userId].steps || [];

            if (!currentWord || currentWord.steps.length !== steps.length) {
                let playgroundState = { winner, allWords,
                    row: steps.length,
                    column: 0,
                    letters: getMatrix(5, ''),
                    currentWord: { id: currentWordId, name, steps: steps }
                };

                dispatch(setPlaygroundState(playgroundState));
            }
        }
        else {
            const availableWords = allWords.filter((word) => !word.solvers || !word.solvers[userId] || !(word.solvers && word.solvers[userId] && word.solvers[userId].status === doneStatus.id));

            const randomWord = getRandomItem(availableWords);

            if (randomWord) {
                set(ref(getDatabase(), 'words/' + randomWord.id), {
                    name: randomWord.name,
                    solvers: {
                        ...randomWord.solvers,
                        [userId]: {
                            status: currentStatus.id,
                            steps: []
                        }
                    }
                })
                    .then(() => getWordsObserver());
            }
        }
    }, [allWords]);

    useEffect(() => {
        if (letters && previousLetters) {
            let newColumn = column;

            if (letters[column].length) {
                newColumn = newColumn + 1;

                newColumn = newColumn > 4 ? 0 : newColumn;
            }
            else if (letters[column] === previousLetters[column]) {
                newColumn = newColumn - 1;

                newColumn = newColumn < 0 ? 4 : newColumn;
            }

            dispatch(setPlaygroundState({ currentWord, row, letters, winner, allWords,
                column: newColumn
            }));
        }
    }, [letters]);

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

    const getInnerLetter = (yIndex, xIndex) => {
        const innerLetter = '';

        if (yIndex < row) {
            return currentWord.steps[yIndex][xIndex];
        }
        else if (yIndex === row) {
            return letters[xIndex];
        }

        return innerLetter;
    }

    const setLetter = (letter) => {
        let newLetters = JSON.parse(JSON.stringify(letters));

        newLetters[column] = letter;

        dispatch(setPlaygroundState({ currentWord, row, column, winner, allWords,
            letters: newLetters
        }));
    }

    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * (array.length - 1))];
    }

    const onSubmitWord = () => {
        if (letters.join('').toLowerCase() === currentWord.name) {
            const winningWord = allWords.find((word) => word.id === currentWord.id && word.solvers && word.solvers[userId] &&
                        word.solvers[userId].status === currentStatus.id && !word.solvers[userId].scene);

            if (winningWord) {
                const availableScenes = scenes.filter((scene) => {
                    const usedScenes = allWords.filter((word) => word.solvers && word.solvers[userId] && word.solvers[userId].status === doneStatus.id && word.solvers[userId].scene)
                        .map((usedWord) => usedWord.solvers[userId].scene);

                    return !usedScenes.includes(scene.id);
                });

                if (getRandomItem(availableScenes)) {
                    const winningWordSteps = winningWord.solvers[userId].steps || [];
                    const finalAttempts = [...winningWordSteps, letters];

                    const chosenScene = getRandomItem(availableScenes);

                    const date = getTodayDateFormatted();

                    set(ref(getDatabase(), 'words/' + winningWord.id + '/solvers/' + userId),
                        { status: doneStatus.id, steps: finalAttempts, scene: chosenScene.id, date })
                        .then(() => navigation.navigate('Result', { attempts: finalAttempts.length, sceneUrl: chosenScene.url }));
                }
            }
        }
        else if (row + 1 > 4) {
            let lostWord = allWords.find((word) => word.id === currentWord.id && word.solvers && word.solvers[userId]);

            if (lostWord) {
                let newSolvers = { };

                Object.keys(lostWord.solvers).forEach((solver) => {
                    if (solver !== userId) {
                        newSolvers[solver] = lostWord.solvers[solver];
                    }
                });

                set(ref(getDatabase(), 'words/' + lostWord.id + '/solvers'), newSolvers)
                    .then(() => navigation.navigate('Result', { attempts: -1 }));
            }
        }
        else {
            setLoading(true);

            set(ref(getDatabase(), 'words/' + currentWord.id + '/solvers/' + userId + '/steps'), [...currentWord.steps, letters])
                .then(() => getWordsObserver());
        }
    }

    return (currentWord ?
            (<View style={styles.container}>
                <View style={styles.playgroundContainer}>
                    <ImageBackground
                        source={require('../../../assets/images/playground-background.png')}
                        style={styles.backgroundImage}
                        resizeMode="stretch"
                    />

                    <View style={styles.inputGroup}>
                        {getMatrix(5).map((y, yIndex, yArray) => (
                            <View style={{...styles.inputRow, marginBottom: yIndex !== yArray.length - 1 ? 10 : 0 }}>
                                {getMatrix(5).map((x, xIndex, xArray) => (
                                    <TouchableOpacity
                                        style={{...styles.letterDisc, ...getXCustomStyle(yIndex, xIndex, xArray)}}
                                        activeOpacity={1}
                                        onPress={() => dispatch(setPlaygroundState({ currentWord, row, letters, winner, allWords,
                                            column: xIndex
                                        }))}
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
                        disabled={isSubmitDisabled}
                        onPress={() => onSubmitWord()}
                    >
                        <Text style={{...styles.buttonText, color: isSubmitDisabled ? 'gray' : 'black' }}>
                            Je confirme
                        </Text>
                    </TouchableOpacity>
                </View>

                <FakeKeyboard setLetter={setLetter} />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={loading}
                    onRequestClose={() => {  }}
                >
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                </Modal>
            </View>)
            :
            (<View style={styles.container} />)
    )
}