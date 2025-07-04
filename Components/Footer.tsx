// /* Footer.tsx code here */

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Footer = () => {
//   const [dateTime, setDateTime] = useState(new Date().toLocaleString());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDateTime(new Date().toLocaleString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.footer}>
//       <Text style={styles.text}>Current Date/Time: {dateTime}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   text: {
//     fontSize: 14,
//     color: '#666',
//   },
// });


// export default Footer;
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
    height: 60,
    backgroundColor: '#ffcccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});


export default Footer;
