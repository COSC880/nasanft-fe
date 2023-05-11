/* eslint-disable no-undef */
import "../global";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import CustomButton from "../components/CustomButton";
import GoBackHeader from "../components/GoBackHeader";
import PropTypes from "prop-types";
import RegistrationConnect from "./RegistrationConnect";
import ScreenSetUp from "../components/ScreenSetUp";
import colors from "../config/colors";

// eslint-disable-next-line no-unused-vars
const SCHEME_FROM_APP_JSON = "walletconnect-example";

function RegistrationScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const userDetails = {
    user: {
      public_address: authContext.publicAddress,
      user_name: newName,
    },
  };

  RegistrationScreen.propTypes = {
    navigation: PropTypes.object,
  };

  const registerAccount = async (userDetails) => {
    if (userDetails.user.user_name.length < 4) {
      Alert.alert(
        "Invalid Registration",
        "Username must be at least 4 characters."
      );
    } else {
      return await fetch("https://nasaft-tbact528.b4a.run/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.text.localeCompare(
              'duplicate key value violates unique constraint "user_data_public_address_key"'
            ) == 0
          ) {
            Alert.alert(
              "Registration Failed",
              "Your public address is already registered! Please login instead.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("LoginScreen"),
                },
              ]
            );
            return Promise.reject(data.text);
          }
          if (data.text.localeCompare("Created") == 0) {
            navigation.navigate("LoginScreen");
          }
          console.log(data);
        })
        .catch((error) => {
          console.log("Something went wrong with registration" + error);
        });
    }
  };

  return (
    <ScreenSetUp>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <GoBackHeader color="white" navigation={navigation}></GoBackHeader>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../assets/FullLogo.png")}
            />
            <AppText color="white" fontSize={26}>
              Register Account
            </AppText>
          </View>
          <View style={{ flex: 0.5, top: 180 }}>
            <View style={styles.userContainer}>
              <AppText style={styles.displayName}> Display Name</AppText>
              <TextInput
                onChangeText={(text) => setNewName(text)}
                placeholder=" Enter Display Name"
                style={styles.usernameInput}
              ></TextInput>
            </View>
            <View style={styles.touchableButton}>
              <View>
                <RegistrationConnect navigation={navigation} />
              </View>
              {!authContext.publicAddress ? (
                <AppText></AppText>
              ) : (
                <View style={styles.registerButtonView}>
                  <CustomButton
                    fontFamily="Rag_Bo"
                    fontSize={18}
                    marginVertical={7}
                    onPress={() => registerAccount(userDetails)}
                    title="Register"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flex: 1,
    position: "absolute",
    top: 60,
  },
  displayName: {
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 4,
    height: 34,
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  logo: {
    alignSelf: "center",
    borderColor: colors.white,
    borderRadius: 60,
    borderWidth: 5,
    height: 120,
    width: 120,
  },
  registerButtonView: {
    alignItems: "center",
    alignSelf: "center",
    height: 80,
    width: "80%",
  },
  touchableButton: {
    alignSelf: "center",
    marginVertical: 20,
    width: "100%",
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 30,
  },
  usernameInput: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 4,
    fontSize: 16,
    fontWeight: "bold",
    height: 35,
    marginLeft: 30,
    width: "55%",
  },
});

export default RegistrationScreen;
