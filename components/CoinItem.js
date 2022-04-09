import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const coinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.leading}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.textsLeading}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSimbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrices}>${coin.current_price}</Text>
        <Text
          style={[
            styles.textPrices,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#ffffff",
  },
  leading: {
    flexDirection: "row",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSimbol: {
    color: "#434343",
    fontSize: 10,
    textTransform: "uppercase",
  },
  textsLeading: {
    marginLeft: 10,
  },
  textPrices: {
    color: "#fff",
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
});

export default coinItem;
