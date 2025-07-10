

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View style={styles.footer}>
        <Text style={styles.text}>You're viewing this on: {dateTime}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "",

  position: "absolute",
  bottom: -5,
  left: 0,
  right: 0,

  },
  footer: {
    height: 30, 
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    flexShrink: 0,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default Footer;
