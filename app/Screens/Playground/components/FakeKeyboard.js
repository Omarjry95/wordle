import React, {useMemo, useState} from 'react';
import { styles } from "../styles";
import { View, TouchableOpacity } from 'react-native';
import {getMatrix} from "../utils";
import {AZERTY_KEYBOARD, FRENCH_SPECIAL_CHARACTERS, LETTERS_BY_ROW} from "../constants";
import LettersRow from "./LettersRow";
import * as Icons from '@expo/vector-icons';

export default function FakeKeyboard(props) {

    const { setLetter } = props;

    const [specials, showSpecials] = useState(false);

    const lettersRows = useMemo(() => {
        const letters = specials ? FRENCH_SPECIAL_CHARACTERS : AZERTY_KEYBOARD;

        const loops = Math.floor(letters.length / LETTERS_BY_ROW) + (letters.length % LETTERS_BY_ROW === 0 ? 0 : 1);

        return getMatrix(loops).map((row, index) => letters.slice(row * LETTERS_BY_ROW, row * LETTERS_BY_ROW + LETTERS_BY_ROW));
    }, [specials]);

    const getControl = (iconProps) => {
        const { iconLibrary, name, action } = iconProps;

        const IconLibrary = Icons[iconLibrary];

        return (
            <TouchableOpacity
                style={styles.control}
                onPress={() => action()}
            >
                <IconLibrary name={name} size={32} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.keyboardContainer}>
            {lettersRows.map((row, rowIndex, rows) =>
                (rowIndex !== rows.length - 1 ?
                    (<LettersRow
                        row={row}
                        last={rowIndex === rows.length - 1}
                        setLetter={setLetter}
                    />)
                        :
                    (<View style={styles.lettersWithControls}>
                        {getControl({ name: specials ? 'alphabetical-variant-off' : 'alphabetical-variant',
                            iconLibrary: 'MaterialCommunityIcons',
                            action: () => showSpecials(!specials) })
                        }

                        <LettersRow
                            row={row}
                            last={rowIndex === rows.length - 1}
                            setLetter={setLetter}
                        />

                        {getControl({ name: 'backspace', iconLibrary: 'MaterialCommunityIcons', action: () => setLetter('') })}
                    </View>)
                ))}
        </View>
    )
}