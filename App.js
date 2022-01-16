import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    setLoading(true);
    
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("Original data:");
        // console.log(responseData);

        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        // console.log("My bus:");
        // console.log(myBus);
        
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style ={styles.busText}>Bus No.: 155</Text>
      <Text style ={styles.title}>Bus Arrival Time:</Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color="blue" size="large" /> : arrival}</Text>
       
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 30,
    
  },
  busText: {
    fontSize: 30,
    color: 'red',
  },
  arrivalTime: {
    fontSize: 30,
  },
  buttonText: {
    fontSize: 20,
  },
});
