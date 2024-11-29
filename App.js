import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIpInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched IP data:", data);
      setIpInfo(data);
    } catch (error) {
      console.error("Error fetching IP information: ", error);
      Alert.alert("Error", "Unable to fetch IP information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IP Address Information</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ipInfo ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>IPv4 Address: {ipInfo.ip}</Text>
          <Text style={styles.infoText}>City: {ipInfo.city}</Text>
          <Text style={styles.infoText}>Region: {ipInfo.region}</Text>
          <Text style={styles.infoText}>Country: {ipInfo.country_name}</Text>
          <Text style={styles.infoText}>ISP: {ipInfo.org}</Text>
          <Text style={styles.infoText}>ASN: {ipInfo.asn}</Text>
        </View>
      ) : (
        <Text>No IP information available</Text>
      )}
      <TouchableOpacity style={styles.customButton} onPress={fetchIpInfo}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoText: {
    fontSize: 22,
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
