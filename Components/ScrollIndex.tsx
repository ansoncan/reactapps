import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

interface ScrollIndexProps {
  scrollOffset: number;
  showDropdown: boolean;
  toggleDropdown: () => void;
  scrollToTop: () => void;
  hideDropdown: () => void;
}

export const ScrollIndex = ({
  scrollOffset,
  showDropdown,
  toggleDropdown,
  scrollToTop,
  hideDropdown,
}: ScrollIndexProps) => {
  if (scrollOffset <= 200) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => toggleDropdown()} // Ensure this is correctly used as a callback function
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        activeOpacity={0.7}
      >
        <View style={styles.arrowAndIndex}>
          <Icon name="arrow-up" size={18} color="#bcbcbc" />
          <Text style={styles.arrowText}>
            {Math.floor(scrollOffset / 350) + 1}
          </Text>
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <TouchableWithoutFeedback onPress={hideDropdown}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => {
                scrollToTop();
                hideDropdown(); // Ensure dropdown is hidden after scrolling to top
              }}
            >
              <Text
                style={styles.dropdownText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Go to Top Item
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 120, // Adjusting for iPhone demo
    zIndex: 1000,
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  arrowButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    justifyContent: "center", // Center content vertically within the button
  },
  arrowAndIndex: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 16, // Adjusting for iPhone demo
    color: "#999999",
    marginLeft: 5, // Add some space between the icon and text
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    marginTop: 5,
    width: 130,
  },
  dropdownText: {
    fontSize: 16, // Adjusting for iPhone demo
    color: "#999999",
  },
});
