// import React, { useEffect, useState } from 'react';
// import { ScrollView, Text, View } from 'react-native';

// const VisaListPage = () => {
//   const [visas, setVisas] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Make GET request to your server
//       const response = await fetch('http://your-server-url.com/api/visas');
//       const data = await response.json();
//       setVisas(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={{ padding: 20 }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>List of Visas</Text>
//         {visas.map(visa => (
//           <View key={visa.visaId} style={{ marginBottom: 20 }}>
//             <Text>Name: {visa.name}</Text>
//             <Text>Process Time: {visa.processTimeInDays} days</Text>
//             <Text>Fees: ${visa.fees}</Text>
//             <Text>Country: {visa.country.name}</Text>
//             <Text>Region: {visa.region}</Text>
//             <Text>GDP Rank: {visa.gdpRank}</Text>
//             {/* Render other visa details as needed */}
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default VisaListPage;

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const VisaPage = () => {
//   const [visas, setVisas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('localhost:8080/api/visas');
//         setVisas(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching visas:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView>
//       {visas.map((visa) => (
//         <View key={visa.id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//           <Text>Visa ID: {visa.id}</Text>
//           <Text>Name: {visa.name}</Text>
//           <Text>Fees: {visa.fees}</Text>
//           {/* Add more visa details as needed */}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default VisaPage;