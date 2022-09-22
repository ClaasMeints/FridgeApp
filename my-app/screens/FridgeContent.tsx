import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { ColorSchemeName } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import FridgeItemView from "../components/FridgeItem";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function FridgeContent({
    navigation,
}: RootTabScreenProps<"FridgeContent">) {
    const [isLoading, setLoading] = useState(true);
    const [fridgeContent, setFridgeContent] = useState([]);
    const styles = useStyles(useColorScheme());

    const getFridgeContent = async () => {
        try {
            const response = await fetch(
                "http://192.168.178.30:3000/api/v1/device_content/admin"
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
                    <TouchableOpacity
                        onPress={() => {}}
                        style={styles.fab}
                        activeOpacity={0}
                    >
                        <Text style={styles.fabIcon}>+</Text>
                    </TouchableOpacity>
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
