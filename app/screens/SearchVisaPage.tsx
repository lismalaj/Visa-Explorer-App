import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const SearchVisaPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [fees, setFees] = useState('');
  const [region, setRegion] = useState('');

  const apiUrl = 'YOUR_API_BASE_URL/api/visas';

  const handleSearch = () => {
    let url = `${apiUrl}?`;
    if (countryCode) url += `country_code=${countryCode}&`;
    if (fees) url += `fees_high=${fees}&`;
    if (region) url += `region=${region}&`;


    // Remove the trailing '&' if any
    url = url.replace(/&$/, '');

    // Now make the GET request using 'fetch' or any other HTTP client library
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View>
      <Text>Country Code:</Text>
      <TextInput
        value={countryCode}
        onChangeText={text => setCountryCode(text)}
        placeholder="Enter country code"
      />
      <Text>Fees:</Text>
      <TextInput
        value={fees}
        onChangeText={text => setFees(text)}
        placeholder="Enter fees"
      />
      <Text>Region:</Text>
      <TextInput
        value={region}
        onChangeText={text => setRegion(text)}
        placeholder="Enter region"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchVisaPage;
