import "react-native-get-random-values";

import theme from "./src/theme";
import { REALM_APP_ID } from "@env";
import { AppProvider, UserProvider } from "@realm/react";
import { ThemeProvider } from "styled-components/native";

import { SignIn } from "./src/screens/SignIn";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Routes } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider } from "./src/libs/realm";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
