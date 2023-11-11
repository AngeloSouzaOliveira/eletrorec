import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Rating = ({ rating, color }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Text key={i} style={{ color, fontSize: 12 }}>
          ★
        </Text>
      );
    } else {
      stars.push(
        <Text key={i} style={{ color, fontSize: 12 }}>
          ☆
        </Text>
      );
    }
  }

  return (
    <View style={styles.container}>
      {stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: 'rgb(24, 131, 122)',
    borderRadius: 10,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
  }
});
