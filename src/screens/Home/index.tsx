import { useNavigation } from "@react-navigation/native";
import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content } from "./styles";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const { navigate } = useNavigation();

  const history = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    } else {
      navigate("departure");
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert("Veículo em uso", "Não foi possível encontrar o veículo.");
      console.log(error);
    }
  }

  function fetchHistoryVehicle() {
    const response = history.filtered(
      "status = 'arrival' SORT(created_at DESC)"
    );
    console.log(response);
  }

  useEffect(() => {
    fetchHistoryVehicle();
  }, []);

  useEffect(() => {
    fetchVehicleInUse();
  }, [history]);

  useEffect(() => {
    realm.addListener("change", () => fetchVehicleInUse());

    return realm.removeListener("change", fetchVehicleInUse);
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
