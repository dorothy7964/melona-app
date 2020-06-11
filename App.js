import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { AsyncStorage } from 'react-native';
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from 'react-apollo-hooks';
import styles from "./styles";
import apolloClientOptions from "./apollo";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    
    const preLoad = async() => {
        try {
            await Font.loadAsync({
            ...Ionicons.font
            });
            await Asset.loadAsync(require("./assets/logo.png"));
            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: AsyncStorage,
            });
            const client = new ApolloClient({
                cache,
                ...apolloClientOptions
            });
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            if (!isLoggedIn || isLoggedIn === "false") {
                setIsLoggedIn(false);
            } else {
              setIsLoggedIn(true);
            }
            setLoaded(true);
            setClient(client);
        } catch (e) {
            console.log(e);
        }     
    };

    // react-native-paper
    const theme = {
        ...DefaultTheme,
        roundness: 5,
        colors: {
            ...DefaultTheme.colors,
            primary: '#b9dd39',
            accent: '#f1c40f',
            text: '#262626'
        }
    };

    useEffect(() => {
        preLoad();
    }, []);

    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={styles}>
                <PaperProvider theme={theme}>
                    <AuthProvider isLoggedIn={isLoggedIn}>
                        <NavController />
                    </AuthProvider>
                </PaperProvider>
            </ThemeProvider>
        </ApolloProvider>
    ) : (
        <AppLoading />
    );
}