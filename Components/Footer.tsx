// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Footer = () => {
//   const [dateTime, setDateTime] = useState(new Date().toLocaleString());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDateTime(new Date().toLocaleString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView edges={[]} style={styles.safeArea}>
//       <View style={styles.footer}>
//         <Text style={styles.text}>You're viewing this on: {dateTime}</Text>
//       </View>
//     </SafeAreaView>

//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     // backgroundColor: '#ffcccc',
//   },
//   footer: {
//     height: 30,
//     // backgroundColor: '#8e8e93',
//     justifyContent: 'center', // Align content to bottom
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     width: '100%',
//     paddingBottom: 5, // Optional: adds a little spacing from bottom
//   },
//   text: {
//     fontSize: 12, // Smaller font to fit in small height
//     color: '#333',
//   },
// });

// export default Footer;

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
    backgroundColor: "#fff",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    flexShrink: 0,
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});

export default Footer;
