import React from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {useSelector} from "react-redux";
import {authSelector} from "../../../Auth/authSlice";
import {statusSelector} from "../../../Auth/statusSlice";
import {getMatrix} from "../utils";

export default function PlaygroundEnvironment({ children, currentWordState, updateCurrentWord, setRow, setColumn, setWords }) {

    const { user } = useSelector(authSelector);
    const { status } = useSelector(statusSelector);

    const { id } = user;

    onValue(ref(getDatabase(), '/words'), (snapshot) => {

        const words = [];

        const currentStatus = status.find((s) => s.value === "CURRENT");
        const doneStatus = status.find((s) => s.value === "DONE");

        if (currentStatus) {
            snapshot.forEach((word) => { words.push({ id: word.key, ...word.val() }); });

            const currentWord = words.filter((word) => word.solvers && word.solvers[id] && word.solvers[id].status === currentStatus.id)[0];

            if (currentWord) {
                const { id: currentWordId, name, solvers } = currentWord;
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
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}