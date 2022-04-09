import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";

import CoinItem from "./components/CoinItem";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto prices</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
        showVerticalScrollIndicator={false}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              setRefreshing(true);
              await loadData();
              setRefreshing(false);
            }}
            tintColor="blue"
            colors={["red", "green"]}
            size={RefreshControl.SIZE.LARGE}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 60,
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default App;
