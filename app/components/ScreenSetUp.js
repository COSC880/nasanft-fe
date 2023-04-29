/* eslint-disable no-undef */
/* lint doesn't like require, considers it undefined */
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import Constants from "expo-constants";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function ScreenSetUp({ children, style }) {
  const { iotd } = useContext(AuthContext);
  const windowDimensions = Dimensions.get("window");
  const height = windowDimensions.height;
  const width = windowDimensions.width;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (iotd == null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [iotd]);

  return loading ? (
    <SafeAreaView style={[styles.screen, style]}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/PIA13110_large.jpg")}
      >
        <View style={[styles.view, style]}>{children}</View>
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <ImageBackground
      style={styles.background}
      source={{
        width: width,
        height: height,
        uri: iotd,
      }}
      defaultSource={require("../assets/PIA13110_large.jpg")}
    >
      <View style={[styles.view, style]}>{children}</View>
    </ImageBackground>
  );
}

ScreenSetUp.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  screen: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
  },
});

export default ScreenSetUp;
