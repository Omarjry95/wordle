import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from '../styles';
import {menuItems} from "../constants";
import * as Icons from '@expo/vector-icons';

export default function Menu() {

    const getIcon = (item) => {
        const { icon, iconLibrary } = item;

        const IconLibrary = Icons[iconLibrary];
        const iconProps = { name: icon, style: styles.icon, size: 40 };

        return <IconLibrary {...iconProps} />
    }

    return (
        <View style={styles.menuContainer}>
            <Text style={styles.score}>
                0 Mystères résolus
            </Text>

            <View style={styles.itemsContainer}>
                {menuItems.map((item, index, array) => (
                    <TouchableOpacity style={{ marginRight: index !== array.length - 1 ? 20 : 0, ...styles.item}}>
                        {getIcon(item)}

                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}