import React, { useContext, useEffect } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import BLEAdvertiser from "react-native-ble-advertiser";
import BackgroundJob from "react-native-background-actions";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as BleContext } from "../context/BleContext";
import { primaryColor } from "../utils/Colors";

const sleep = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

const options = {
  taskName: "ccts",
  taskTitle: "CCTS",
  taskDesc: "Aplicación CCTS está transmitiendo...",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: primaryColor,
  parameters: {
    delay: 5000,
  },
};

export default () => {
  const {
    state: { uuid },
  } = useContext(AuthContext);
  const {
    state: { broadcastState, started },
    setBroadcastState,
    setStarted,
  } = useContext(BleContext);

  const getAdapter = async () => {
    const adapterState = await BLEAdvertiser.getAdapterState()
      .then((result) => {
        return result === "STATE_ON";
      })
      .catch((error) => {
        return false;
      });

    return adapterState;
  };

  const tryToBroadcast = async () => {
    const blueoothActive = await getAdapter();

    if (!blueoothActive) {
      await Alert.alert(
        "CCTS requiere de bluetooth",
        "Deseas permitir a CCTS utilizar bluetooth?",
        [
          {
            text: "Yes",
            onPress: () => {
              BLEAdvertiser.enableAdapter();
              BLEAdvertiser.setCompanyId(0x4c);
              sleep(2000).then(() =>
                BackgroundJob.start(startBroadcast, options)
              );
            },
          },
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      BLEAdvertiser.setCompanyId(0x4c);
      sleep(2000).then(() =>
        BackgroundJob.start(startBroadcast, options)
      );
    }
  };

  const startBroadcast = async () => {
    await new Promise(() => {
      BLEAdvertiser.broadcast(uuid, [1, 0], {
        advertiseMode: BLEAdvertiser.ADVERTISE_MODE_LOW_,
        txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_HIGH,
        connectable: false,
        includeDeviceName: false,
        includeTxPowerLevel: false,
      })
        .then((sucess) => {
          console.log(uuid, "Adv Successful", sucess);
          setBroadcastState({ broadcastState: true });
          setStarted({ started: true });
        })
        .catch((error) => {
          console.log(uuid, "Adv Error", error);
          setBroadcastState({ broadcastState: false });
          setStarted({ started: false });
        });
    });
  };

  const stopBroadcast = async () => {
    await BackgroundJob.stop();
    BLEAdvertiser.stopBroadcast()
      .then((sucess) => console.log(uuid, "Stop Broadcast Successful", sucess))
      .catch((error) => console.log(uuid, "Stop Broadcast Error", error));
    setBroadcastState({ broadcastState: false });
    setStarted({ started: false });
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "CCTS",
            message:
              "CCTS requiere de tu ubicacion implicita para trazar tus contactos cercanos.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
        } else {
          console.log("location permission denied");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!started) {
      stopBroadcast();

      if (uuid) {
        requestLocationPermission();

        tryToBroadcast();
      }
    }
  }, [uuid]);

  return [broadcastState, tryToBroadcast, stopBroadcast];
};
