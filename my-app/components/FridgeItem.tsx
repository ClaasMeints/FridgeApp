import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "@rneui/base";
import { FridgeItem } from "../data";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { ColorSchemeName } from "react-native";
import useColorScheme from "../hooks/useColorScheme";

export default function FridgeItemView(props: { item: FridgeItem }) {
    const styles = useStyles(useColorScheme());
    return (
        <TouchableOpacity activeOpacity={0}>
            <View style={styles.button}>
                <Image
                    style={styles.image}
                    source={{ uri: props.item.image }}
                ></Image>
                <View style={styles.column}>
                    <Text style={styles.heading}>{props.item.name}</Text>
                    <Text>{props.item.category}</Text>
                </View>
                <View style={styles.column}>
                    <Text>Expiry: {props.item.expiry}</Text>
                    <Text>
                        Quantity: {props.item.quantity + props.item.unit_symbol}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: NonNullable<ColorSchemeName>) =>
    StyleSheet.create({
        button: {
            flex: 1,
            flexDirection: "row",
            margin: 2,
            padding: 10,
            elevation: 3,
            borderColor: Colors[theme].tint,
            borderWidth: 1,
        },
        image: {
            width: 60,
            height: 60,
            marginRight: 5,
        },
        column: {
            flex: 1,
            flexDirection: "column",
            marginLeft: 10,
        },
        heading: {
            fontSize: 18,
            fontWeight: "bold",
        },
    });
