import { Alert } from "react-native";
import { useUser } from "@realm/react";
import { useRef, useState } from "react";
import { useRealm } from "../../libs/realm";
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Historic } from "../../libs/realm/schemas/Historic";
import { TextAreaInput } from "../../components/TextAreaInput";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { ScrollView } from "react-native";
import { licensePlateValitedate } from "../../utils/licensePlateValidate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function Departure() {
  const [licensePlate, setLicensePlate] = useState("");
  const [description, setDescription] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const realm = useRealm();
  const user = useUser();
  const { goBack } = useNavigation();

  const descriptionRef = useRef(null);
  const licensePlateRef = useRef(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValitedate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          "Placa inválida",
          "A placa é inválida. Por favor informe uma placa correta!"
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          "Finalidade",
          "Por favor, informe a finalidade de utilização do veículo!"
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          })
        );
      });

      Alert.alert("Saída", "Saída do veículo registrada com sucesso.");

      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não é possível registrar a saída do veículo.");
      setIsRegistering(false);
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraScrollHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              onChangeText={setDescription}
              blurOnSubmit
            />

            <Button title="Registrar saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
