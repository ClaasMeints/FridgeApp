import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ColorSchemeName } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import FridgeItemView from "../components/FridgeItem";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function FridgeContent(
    deviceId: number,
    { navigation }: RootTabScreenProps<"FridgeContent">
) {
    const [isLoading, setLoading] = useState(true);
    const [fridgeContent, setFridgeContent] = useState([]);
    const styles = useStyles(useColorScheme());

    const getFridgeContent = async () => {
        try {
            const response = await fetch(
                "http://192.168.178.30:3000/api/v1/device_content/" + deviceId
            );
            const json = await response.json();
            setFridgeContent(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFridgeContent();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <FlatList
                        data={fridgeContent}
                        renderItem={({ item }) => (
                            <FridgeItemView item={item} />
                        )}
                    />
                </>
            )}
        </View>
    );
}

const useStyles = (theme: NonNullable<ColorSchemeName>) =>
    StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            padding: "2%",
        },
    });
