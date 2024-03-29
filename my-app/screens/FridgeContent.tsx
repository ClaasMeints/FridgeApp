import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ColorSchemeName } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import FridgeItemView from "../components/FridgeItem";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function FridgeContent({
    navigation,
}: RootTabScreenProps<"FridgeContent">) {
    const [isLoading, setLoading] = useState(true);
    const [fridgeContent, setFridgeContent] = useState([]);
    const styles = useStyles(useColorScheme());

    const getFridgeContent = async () => {
        try {
            const response = await fetch(
                "http://192.168.178.30:3000/api/v1/device_content/claas"
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

    useInterval(() => getFridgeContent(), 200);

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
