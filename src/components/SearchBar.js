import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({
  term,
  onTermChange,
  onTermSubmit,
  placeholder,
  onFocus,
}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        onEndEditing={() => onTermSubmit()}
        onFocus={() => onFocus()}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

SearchBar.defaultProps = {
  onFocus: () => {},
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
