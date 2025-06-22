import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  year: number | null;
  setYear: (year: number) => void;
  months: number[];
  handleMonthSelection: (month: number) => void;
  applyFilters: () => void;
  earliestYear: number;
  latestYear: number;
}

export const FilterModal = ({ isVisible, onClose, year, setYear, months, handleMonthSelection, applyFilters, earliestYear, latestYear }: FilterModalProps) => {
  if (!isVisible) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Year Slider */}
            {earliestYear !== undefined && latestYear !== undefined && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Year</Text>
                <Slider
                  value={year === null ? earliestYear : year}
                  minimumValue={earliestYear}
                  maximumValue={latestYear}
                  step={1}
                  onValueChange={(value) => setYear(Math.round(value))}
                  thumbTintColor="#4DA8DA"
                  minimumTrackTintColor="#4DA8DA" // Set the color for the track
                  maximumTrackTintColor="#ccc" 
                  trackStyle={{ height: 2, width: 280 }} // Set specific width
                  thumbStyle={{ height: 24, width: 24 }}
                />
                <Text style={styles.sliderValue}>{year === null ? earliestYear : year}</Text>
              </View>
            )}
            <View style={styles.separator} />
 
            {/* Month Buttons */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Month</Text>
              <View style={styles.monthButtonsContainer}>
                {monthNames.map((name, index) => (
                  <TouchableOpacity
                    key={`month-${index}`}
                    style={[
                      styles.monthButton,
                      months.includes(index + 1) && styles.selectedMonthButton,
                    ]}
                    onPress={() => handleMonthSelection(index + 1)}
                  >
                    <Text style={styles.monthButtonText}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Apply Filters Button */}
            <Button title="Apply Filters" color="#80D8C3" onPress={applyFilters} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center', // Center the content inside the modal
  },
  section: {
    marginBottom: 20,
    width: '100%', // Ensure the section takes full width
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center the title text
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
    color: '#5b5b5b',
  },
  monthButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Distribute space around items
    width: '100%', // Ensure the container takes full width
  },
  monthButton: {
    backgroundColor: '#FFD66B',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    margin: 5, // Add some margin to space out buttons
    minWidth: 90, // Ensure each button has a minimum width for proper spacing
  },
  selectedMonthButton: {
    backgroundColor: '#4DA8DA',
  },
  monthButtonText: {
    color: '#F5F5F5',
  },
});