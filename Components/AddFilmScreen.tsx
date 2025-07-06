// // // AddFilmScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { submitFilm } from "../service/film_api";

const AddFilmScreen = ({ film, closeModal }) => {
  const [filmData, setFilmData] = useState({
    title: film.title,
    year: film.year || "",
    released: film.released || "",
    runtime: film.runtime || "",
    language: film.language || "",
    genre: film.genre || "",
    director: film.director || "",
    poster: film.poster || "",
  });

  const handleChange = (field, value) => {
    setFilmData({ ...filmData, [field]: value });
  };

  const resetFields = () => {
    Alert.alert("Reset Fields", "Are you sure you want to reset all fields?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () =>
          setFilmData({
            title: film.title,
            year: film.year || "",
            released: film.released || "",
            runtime: film.runtime || "",
            language: film.language || "",
            genre: film.genre || "",
            director: film.director || "",
            poster: film.poster || "",
          }),
      },
    ]);
  };

  const addFilm = () => {
    Alert.alert("Add Film", "Are you sure you want to add this film?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          try {
            const cleanedFilmData = {
              ...filmData,
              runtime: parseInt(filmData.runtime.replace(/\D/g, ""), 10), // Extract digits and convert to integer
            };

            console.log("Cleaned film data:", cleanedFilmData);
            await submitFilm(cleanedFilmData);
            Alert.alert("Success", "Film added successfully!");
            closeModal();
          } catch (error) {
            Alert.alert("Error", error.message || "Failed to add film");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {[
        { label: "Title", value: filmData.title, editable: true },
        { label: "Year", value: filmData.year, editable: false },
        {
          label: "Runtime",
          value: filmData.runtime.toString(),
          editable: false,
        },
        { label: "Released", value: filmData.released, editable: true },
        { label: "Language", value: filmData.language, editable: true },
        { label: "Genre", value: filmData.genre, editable: true },
        { label: "Director", value: filmData.director, editable: true },
      ].map((item, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={[styles.input, !item.editable && styles.readOnlyInput]}
            value={item.value}
            editable={item.editable}
            onChangeText={(text) =>
              item.editable && handleChange(item.label.toLowerCase(), text)
            }
            placeholder={item.label}
          />
        </View>
      ))}

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="Add" onPress={addFilm} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Reset" onPress={resetFields} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0",
    color: "#888",
    fontStyle: "italic",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddFilmScreen;
