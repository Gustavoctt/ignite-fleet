import { AppRoutes } from "./app.routes";
import Toast from "react-native-toast-message";
import { TopMessage } from "../components/TopMessage";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        config={{
          info: ({ text1 }) => <TopMessage title={String(text1)} />,
        }}
        topOffset={30}
      />
    </NavigationContainer>
  );
}
