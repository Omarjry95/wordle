import React, {useMemo} from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {useSelector} from "react-redux";
import {authSelector} from "../../../Auth/authSlice";
import {getMatrix} from "../utils";
import {statusSelector} from "../../../Auth/statusSlice";

export default function PlaygroundEnvironment(props) {

    const { children, currentWordState, updateCurrentWord, setRow, setColumn, words, setWords, winner } = props;

    const { user } = useSelector(authSelector);
    const { status } = useSelector(statusSelector);

    const { id } = user;

    const currentStatus = useMemo(() => status.find((s) => s.value === "CURRENT"), [status]);
    const doneStatus = useMemo(() => status.find((s) => s.value === "DONE"), [status]);

    onValue(ref(getDatabase(), '/words'), (snapshot) => {
        if (currentStatus && doneStatus) {
            const words = [];

            snapshot.forEach((word) => { words.push({ id: word.key, ...word.val() }); });

            if (winner) {
                if (currentWordState) {
                    const winningWord = words.find((word) => word.id === currentWordState.id && word.solvers && word.solvers[id] && word.solvers[id].status === currentStatus.id);

                    if (winningWord) {
                        set(ref(getDatabase(), 'words/' + winningWord.id + '/solvers/' + id),
                            { status: doneStatus.id, steps: [...winningWord.steps, words] });
                    }
                }
            }
            else {
                const pendingWord = words.find((word) => word.solvers && word.solvers[id] && word.solvers[id].status === currentStatus.id);
                
                if (pendingWord) {
                    const { id: currentWordId, name, solvers } = pendingWord;
                    const steps = solvers[id].steps || [];

                    if (!currentWordState || currentWordState.steps.length !== steps.length) {
                        updateCurrentWord({ id: currentWordId, name, steps: steps });
                        setRow(steps.length);
                        setColumn(0);
                        setWords(getMatrix(5, ''));
                    }
                }
                else {
                    const availableWords = words.filter((word) => !word.solvers || !word.solvers[id] || !(word.solvers && word.solvers[id] && word.solvers[id].status === doneStatus.id));

                    const randomIndex = Math.floor(Math.random() * (availableWords.length - 1));

                    const randomWord = availableWords[randomIndex];

                    if (randomWord) {
                        set(ref(getDatabase(), 'words/' + randomWord.id), {
                            name: randomWord.name,
                            solvers: {
                                ...randomWord.solvers,
                                [id]: {
                                    status: currentStatus.id,
                                    steps: []
                                }
                            }
                        });
                    }
                }
            }
        }
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}