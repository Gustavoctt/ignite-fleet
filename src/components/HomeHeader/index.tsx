import theme from "../../theme";
import { useUser, useApp } from "@realm/react";
import { TouchableOpacity } from "react-native";
import { Power } from "phosphor-react-native";

import { Container, Greeting, Message, Name, Picture } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeHeader() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  function handleLogout() {
    app.currentUser?.logOut();
  }

  const paddingTop = insets.top + 32;

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureurl }}
        placeholder="LeH2QK%MRPR*_NbbIVWB%Mxae.ae"
      />
      <Greeting>
        <Message>Olá,</Message>

        <Name>{user?.profile.name}</Name>
      </Greeting>
      <TouchableOpacity onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
