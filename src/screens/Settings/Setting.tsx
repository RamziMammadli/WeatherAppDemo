import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBackgroundColor } from '../../api/reducers/changeTheme';

const Setting = () => {
  const [dark, setDark] = useState('#000');
  const [white, setWhite] = useState('#fff');
  const [original, setOriginal] = useState('#E7E7F2');

  const dispatch = useDispatch();

  const getDark = () => {
    dispatch(setBackgroundColor(dark));
  };

  const getWhite = () => {
    dispatch(setBackgroundColor(white));
  };

  const getOriginal = () => {
    dispatch(setBackgroundColor(original));
  };

  return (
    <View
      style={{
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: 'gray',
        flex: 1,
        flexDirection: 'row',
        gap: 15,
      }}>
      <Text style={{ fontSize: 20, color: 'yellow' }}> Renk Modlar</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => getDark()}>
        <Text>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => getWhite()}>
        <Text>White</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => getOriginal()}>
        <Text>Original</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 15,
    borderWidth: 0.5,
  },
});
