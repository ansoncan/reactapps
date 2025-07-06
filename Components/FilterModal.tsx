import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Film {
  _id: string;
  title: string;
  year?: string;
  released?: string;
  poster?: string;
}

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  months: number[];
  handleMonthSelection: (month: number) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  filteredFilms: Film[];
  selectedYears: number[];
  handleYearSelection: (year: number) => void;
}

export const FilterModal = ({
  isVisible,
  onClose,
  months,
  handleMonthSelection,
  applyFilters,
  clearFilters,
  filteredFilms,
  selectedYears,
  handleYearSelection,
}: FilterModalProps) => {
  const monthMap: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const filmsMatchingMonths = filteredFilms.filter((f) => {
    if (!f.released) return false;
    const match = f.released.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/);
    if (!match) return false;
    const [, , monthAbbr] = match;
    const monthIndex = monthMap[monthAbbr];
    return months.length === 0 || months.includes(monthIndex);
  });

  // const distinctYears = Array.from(
  //   new Set(
  //     filmsMatchingMonths
  //       .map((f) => {
  //         const match = f.released?.match(
  //           /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/
  //         );
  //         return match ? parseInt(match[3], 10) : null;
  //       })
  //       .filter((y): y is number => y !== null)
  //   )
  // );
  const distinctYears = Array.from(
    new Set(
      filmsMatchingMonths
        .map((f) => {
          const match = f.released?.match(
            /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/
          );
          return match ? parseInt(match[3], 10) : null;
        })
        .filter((y): y is number => y !== null)
    )
  ).sort((a, b) => a - b);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Month Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Month</Text>
                <View style={styles.buttonContainer}>
                  {monthNames.map((name, index) => {
                    const isSelected = months.includes(index + 1);
                    return (
                      <TouchableOpacity
                        key={`month-${index}`}
                        style={[
                          styles.button,
                          isSelected && styles.selectedButton,
                        ]}
                        onPress={() => handleMonthSelection(index + 1)}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            isSelected && styles.selectedButtonText,
                          ]}
                        >
                          {name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Year Selection */}
              {months.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Year</Text>
                  <View style={styles.buttonContainer}>
                    {distinctYears.map((year) => {
                      const isSelected = selectedYears.includes(year);
                      return (
                        <TouchableOpacity
                          key={`year-${year}`}
                          style={[
                            styles.button,
                            isSelected && styles.selectedButton,
                          ]}
                          onPress={() => handleYearSelection(year)}
                        >
                          <Text
                            style={[
                              styles.buttonText,
                              isSelected && styles.selectedButtonText,
                            ]}
                          >
                            {year}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text style={styles.filmCount}>
                    {
                      filmsMatchingMonths.filter((f) => {
                        const match = f.released?.match(
                          /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/
                        );
                        if (!match) return false;
                        const [, , , yearStr] = match;
                        const year = parseInt(yearStr, 10);
                        return (
                          selectedYears.length === 0 ||
                          selectedYears.includes(year)
                        );
                      }).length
                    }{" "}
                    films found
                  </Text>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    applyFilters();
                    onClose(); // Close modal only when user taps "View Result"
                  }}
                >
                  <Text style={styles.actionButtonText}>View Result</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.actionButtonText}>Clear Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1c1c1e",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "30%",
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f2f2f7",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#fff",
  },
  filmCount: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
