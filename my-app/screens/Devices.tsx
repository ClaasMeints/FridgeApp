import { ColorSchemeName, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import React from "react";
import { Text, View } from "../components/Themed";

export default function Devices() {
    const styles = useStyles(useColorScheme());
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {}}
                style={styles.fab}
                activeOpacity={0}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const useStyles = (theme: NonNullable<ColorSchemeName>) =>
    StyleSheet.create({
        container: {},
        fab: {
            position: "absolute",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            bottom: 20,
            borderRadius: 30,
            elevation: 8,
            backgroundColor: Colors[theme].tint,
        },
        fabIcon: {
            fontSize: 40,
            color: Colors[theme].background,
        },
    });
