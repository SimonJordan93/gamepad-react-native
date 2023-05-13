import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FilterModal({
  visible,
  onClose,
  onSortByAToZ,
  onSortByZToA,
  onSortByEarliest,
  onSortByMostRecent,
  onSortByHighest,
  onSortByLowest,
  onResetSort,
}) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.filtersModalContainer}>
        {/* <Text style={styles.filterTitle}>Filters</Text> */}
        {/* Filter inputs */}
        <Text style={styles.filtersTitle}>Sort by alphabetical order :</Text>
        {/* Alphabetical Sorting */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filtersButton} onPress={onSortByAToZ}>
            <Text style={styles.filtersText}>A to Z</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtersButton} onPress={onSortByZToA}>
            <Text style={styles.filtersText}>Z to A</Text>
          </TouchableOpacity>
        </View>
        {/* Reease date Sorting */}
        <Text style={styles.filtersTitle}>Sort by release date :</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filtersButton}
            onPress={onSortByEarliest}
          >
            <Text style={styles.filtersText}>Earliest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filtersButton}
            onPress={onSortByMostRecent}
          >
            <Text style={styles.filtersText}>Most recent</Text>
          </TouchableOpacity>
        </View>
        {/* Ratings Sorting */}
        <Text style={styles.filtersTitle}>Sort by rating :</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filtersButton}
            onPress={onSortByHighest}
          >
            <Text style={styles.filtersText}>Highest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filtersButton}
            onPress={onSortByLowest}
          >
            <Text style={styles.filtersText}>Lowest</Text>
          </TouchableOpacity>
        </View>
        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={onResetSort}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        {/* Close button */}
        <TouchableOpacity style={styles.filterButton} onPress={onClose}>
          <Text style={styles.filterButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  filtersModalContainer: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  // filterTitle: {
  //   color: "black",
  //   backgroundColor: "white",
  //   fontSize: 40,
  //   textAlign: "center",
  //   marginBottom: 20,
  //   padding: 5,
  //   borderRadius: 5,
  // },
  filtersTitle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  filtersButton: {
    width: "45%",
    height: 80,
    // padding: 10,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  filterButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    width: "100%",
    height: 80,
    // padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
