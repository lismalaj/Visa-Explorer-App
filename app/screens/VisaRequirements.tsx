import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select'; 
import Slider from '@react-native-community/slider';
import VisaInterface from '../interfaces/VisaInterface';
import axios from 'axios';

interface RouteProp {
  navigation: NavigationProp<any, any>;
}

const createCountryInfoDictionary = (): { 
  [key: string]: {
     region: string, 
     languages: string[],
     gdpRank: number,
     processingTimeDays: number,
     fees: number,
     hasPerks: boolean,
     offersCitizenship: boolean 
    } } => {
  return {
    'United States of America': {
      region: 'North America',
      languages: ['English'],
      gdpRank: 1,
      processingTimeDays: 730,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Canada': {
      region: 'North America',
      languages: ['English', 'French'],
      gdpRank: 10,
      processingTimeDays: 1110,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Mexico': {
      region: 'North America',
      languages: ['Spanish'],
      gdpRank: 12,
      processingTimeDays: 30,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'China': {
      region: 'Asia',
      languages: ['Chinese'],
      gdpRank: 2,
      processingTimeDays: 4,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Germany': {
      region: 'Western Europe',
      languages: ['German'],
      gdpRank: 3,
      processingTimeDays: 365,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Russia': {
      region: 'Eastern Europe',
      languages: ['Russian'],
      gdpRank: 11,
      processingTimeDays: 10,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Brazil': {
      region: 'South America',
      languages: ['Portuguese'],
      gdpRank: 9,
      processingTimeDays: 15,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Nigeria': {
      region: 'Western Africa',
      languages: ['English'],
      gdpRank: 39,
      processingTimeDays: 15,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Algeria': {
      region: 'Northern Africa',
      languages: ['Arabic'],
      gdpRank: 56,
      processingTimeDays: 7,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Kenya': {
      region: 'Eastern Africa',
      languages: ['Swahili', 'English'],
      gdpRank: 66,
      processingTimeDays: 1095,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'South Africa': {
      region: 'Southern Africa',
      languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English'],
      gdpRank: 41,
      processingTimeDays: 28,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
    'Australia': {
      region: 'Australia',
      languages: ['English'],
      gdpRank: 14,
      processingTimeDays: 26,
      fees: 1,
      hasPerks: false,
      offersCitizenship: false,
    },
  };
};



const VisaRecommendation = ({ navigation }: RouteProp) => {
  const [minGDP, setMinGDP] = useState(1);
  const [maxGDP, setMaxGDP] = useState(100);
  const [processingTime, setProcessingTime] = useState(0); 
  const [wantsPerks, setWantsPerks] = useState(false); 
  const [wantsCitizenship, setWantsCitizenship] = useState(false); 
  // const [knownLanguages, setKnownLanguages] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [visaRecommendation, setVisaRecommendation] = useState('');


  const [visas, setVisas] = useState<Array<VisaInterface>>([]);
    /*
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  */
  
  const [region, setRegion] = useState('');
  const [feeLimit, setFeeLimit] = useState(0)
  const [countryCode, setCountryCode] = useState('');

  const handleReset = () => {
    setMinGDP(1);
    setMaxGDP(100);
    setProcessingTime(6);
    setWantsPerks(false);
    setWantsCitizenship(false);
    // setVisaRecommendation('');
    // setKnownLanguages([])
    // setLoading(false);

    setFeeLimit(0)
    setRegion('')
    setCountryCode('')
  };

  // const countCommonAttributes = (
  //   info: { 
  //     region: string, 
  //     languages: string[], 
  //     gdpRank: number, 
  //     processingTimeDays: number, 
  //     fees: number, 
  //     hasPerks: boolean, 
  //     offersCitizenship: boolean  
  //   }) => {

  //   let count = 0;
  //   const commonLanguages = info.languages.some(lang => knownLanguages.includes(lang));

  //   if (info.region === region || region === '') {count++;}
  //   if (info.gdpRank >= minGDP && info.gdpRank <= maxGDP) {count++;}
  //   if (feeLimit === 0 || info.fees <= feeLimit) {count++;}
  //   if (info.processingTimeDays <= processingTime) {count++;}
  //   if (info.hasPerks === wantsPerks) {count++;}
  //   if (info.offersCitizenship === wantsCitizenship) {count++;}
  //   if (commonLanguages) {count++;}


  //   return count;
  // };

  const [loading, setLoading] = useState(false);

  /*
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  LOOOOOOOOOOOOOOOOOOOOOK
  */

  const apiUrl = 'https://https://8be6-67-80-203-168.ngrok-free.app/api/visas';
  const handleSubmit = async () => {
    // setLoading(true);

    // const countryInfoDict = createCountryInfoDictionary();

    // // Calculate common attributes and sort countries based on count
    // const sortedCountries = Object.entries(countryInfoDict).map(([country, info]) => {
    //   return { country, info, commonAttributes: countCommonAttributes(info) };
    // }).sort((a, b) => b.commonAttributes - a.commonAttributes);

    // const recommendations = sortedCountries.map(({ country, info }) => {
    //   return `${country} (${info.region}) - Processing Time: ${info.processingTimeDays} days`;
    // });

    
    let url = `${apiUrl}?`;
    if (countryCode) url += `country_code=${countryCode}&`;
    url += `fees=${feeLimit}&`;
    if (region) {
      let search = / /g;
      let replacement = "%20";
      let modified = region.replace(search, replacement);
      url += `region=${modified}&`};
    if (minGDP) url += `low_gdp=${minGDP}&`
    if (maxGDP) url += `high_gdp=${maxGDP}&`
    url += `process_time_in_days=${processingTime}&`
    url += `wants_perks=${wantsPerks}&`
    url += `wants_citizenship=${wantsCitizenship}&`
    
    // Remove the trailing '&' if any
    url = url.replace(/&$/, '');
    console.log(url)
    // Now make the GET request using 'fetch' or any other HTTP client library
    setLoading(true);
    /*
    LOOOOOOOOOOOOOOOOOOOOOK
    LOOOOOOOOOOOOOOOOOOOOOK
    LOOOOOOOOOOOOOOOOOOOOOK
    LOOOOOOOOOOOOOOOOOOOOOK
    LOOOOOOOOOOOOOOOOOOOOOK
    */
   
   axios.get(url)
   .then(response => {
     setVisas(response.data);
    //  setVisaRecommendation(recommendations.join('\n'));
     setLoading(false);
    })
    .catch(error => {
      // Handle errors
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('HTTP error status:', error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Request error:', error.message);
        }
        setLoading(false);
      });

  };


  const daysToYearsAndMonths = (days: number) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    return `${years} years ${months} months`;
  };


  return (
    <ScrollView>
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Visa Questionnaire</Text>
        <TouchableRipple
          style={styles.iconButton}
          onPress={() => navigation.openDrawer()}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={true}
        >
          <Ionicons name="menu-outline" size={30} color="#FFFFFF" />
        </TouchableRipple>
      </View>

      <View style={styles.section}>

      <Text style={styles.label}>Choose your Region preference:</Text>
      <RNPickerSelect
        onValueChange={(value) => setRegion(value)}
        items={[
          { label: 'North America', value: 'North America' },
          { label: 'South America', value: 'South America' },
          { label: 'Asia', value: 'Asia' },
          { label: 'Western Europe', value: 'Western Europe' },
          { label: 'Eastern Europe', value: 'Eastern Europe' },
          { label: 'Western Africa', value: 'Western Africa' },
          { label: 'Northern Africa', value: 'Northern Africa' },
          { label: 'Eastern Africa', value: 'Eastern Africa' },
          { label: 'Southern Africa', value: 'Southern Africa' },
          { label: 'Australia', value: 'Australia' },
        ]}
        style={pickerSelectStyles}
        value={region == '' ? null:region}
      />

      {/* <Text style={styles.label}>Enter preferred language:</Text>
      <RNPickerSelect
        onValueChange={(value) => setKnownLanguages(value)}
        items={[
          { label: 'English', value: 'English' },
          { label: 'Spanish', value: 'Spanish' },
          { label: 'French', value: 'French' },
          // Add more languages as needed
        ]}
        style={pickerSelectStyles}
        value={'None'}
      /> */}

      <Text style={styles.label}>Gross Domestic Product (GDP) Preference:</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>{minGDP} - {maxGDP}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor="#71a373"
          maximumTrackTintColor="#999999"
          thumbTintColor="#4CAF50"
          step={1}
          value={minGDP}
          onValueChange={(value) => {
            setMinGDP(value);
            if (value > maxGDP) {
              setMaxGDP(value);
            }
          }}
        />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor="#71a373"
          maximumTrackTintColor="#999999"
          thumbTintColor="#4CAF50"
          step={1}
          value={maxGDP}
          onValueChange={(value) => {
            setMaxGDP(value);
            if (value < minGDP) {
              setMinGDP(value);
            }
          }}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Processing Time Limit:</Text>
        <Text style={styles.label}>{daysToYearsAndMonths(processingTime)}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={2030}
          minimumTrackTintColor="#71a373"
          maximumTrackTintColor="#999999"
          thumbTintColor="#4CAF50"
          step={1}
          value={processingTime}
          onValueChange={(value) => setProcessingTime(value)}
        />
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Fee Limit:</Text>
        <Text style={styles.label}>{feeLimit.toLocaleString()}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10000}
          minimumTrackTintColor="#71a373"
          maximumTrackTintColor="#999999"
          thumbTintColor="#4CAF50"
          step={10}
          value={feeLimit}
          onValueChange={(value) => setFeeLimit(value)}
        />
      </View>


        <Text style={styles.label}>Prefer Country with Perks:</Text>
        <Switch
          value={wantsPerks}
          onValueChange={(value) => setWantsPerks(value)}
          trackColor={{ false: "#767577", true: "#4CAF50" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={ styles.switch }
        />

        <Text style={styles.label}>Prefer Country with Road to Citizenship:</Text>
        <Switch
          value={wantsCitizenship}
          onValueChange={(value) => setWantsCitizenship(value)}
          trackColor={{ false: "#767577", true: "#4CAF50" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={ styles.switch }
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Recommendation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Questionnaire</Text>
        </TouchableOpacity>

      {!loading && VisaRecommendation.length > 0 && (
        // <View style={styles.recommendationsContainer}>
        //   <Text style={styles.recommendations}>{visaRecommendation}</Text>
        // </View>
        <ScrollView>
          {visas ? (visas.map((visa: VisaInterface) => (
            <View key={visa.visaId} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>Visa ID: {visa.visaId}</Text>
              <Text>Name: {visa.name}</Text>
              <Text>FeeLow: {visa.feesLow}</Text>
              <Text>FeeHigh: {visa.feesHigh}</Text>
              <Text>Processing Time (In Days): {visa.processTimeInDays}</Text>
              <Text>Country Code: {visa.countryCode}</Text>
              <Text>Region: {visa.region}</Text>
              <Text>GDP Rank: {visa.gdpRank}</Text>
              <Text>Has Road to Citizenship: {visa.hasRoadToCitizenship ? "True" : "False"}</Text>
              <Text>Has Perks: {visa.hasPerks ? "True" : "False"}</Text>
              {/* Add more visa details as needed */}
            </View>
          ))) : (<Text>No results match your query. Search Again!</Text>)}
      </ScrollView>
      )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',//'#4D6489', 
  },
  headerContainer: {
    backgroundColor: '#225475',//'',#78809D #3b4d49
    paddingVertical: 12,
    paddingHorizontal: 20,
    //paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 100, 
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  iconButton: {
    position: 'absolute', 
    right: 10, 
    top: 40, 
    marginTop: -7, 
    padding: 10,
  },
  section: {
    padding: 20, 
    backgroundColor: '#bccbcf',//'#f8f9fa',#DBC6C0 
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#343a40', //  Dark gray 
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderValue: {
    fontSize: 14,
    color: '#415c42', // slider values
  },
  button: {
    backgroundColor: '#49b357',//007bff
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#c2636c', // bright red#dc3545
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switch: {
    alignSelf: 'flex-start', // Align switch to the start
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f7fbff', // Light grey background for input
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f7fbff', // Consistency across platforms#e9ecef
  },
});


export default VisaRecommendation;
