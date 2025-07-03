/* Footer.tsx code here */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Current Date/Time: {dateTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default Footer;
