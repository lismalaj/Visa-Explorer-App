import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, Linking, Modal, ImageSourcePropType} from 'react-native';
import React, {useState} from 'react';
import { NavigationProp } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DestinationModal from '../components/DestinationModal';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface RouteProp {
    navigation: NavigationProp<any, any>;
}

const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Image
        source={require('../../assets/multinationals_inc.jpg')}
        style={styles.footerImage}
        resizeMode="cover"
      />
      <Text style={styles.footerText}>© 2024 All Rights Reserved | MultiNationals</Text>
      <Text style={styles.footerText}>Call Us: 1 855 771 8472 (Toll Free)</Text>

      <View style={styles.socialMediaContainer}>
      {[ 'domain', 'instagram', 'linkedin'].map(platform => (
        <TouchableOpacity key={platform} onPress={() => {
          let url;
          switch (platform) {
            case 'linkedin':
              url = 'https://www.linkedin.com/company/multinationals-inc/';
              break;
            case 'instagram':
              url = 'https://www.instagram.com/multinationals.inc/';
              break;
            case 'domain':
                url = 'https://www.multinationals.co/';
                break;
            default:
              url = `https://www.${platform}.com/`;
          }
          Linking.openURL(url)
            .catch((err) => console.error('Failed to open URL: ', err));
        }}>
          <MaterialCommunityIcons name={platform} size={24} color="#1E90FF" />
        </TouchableOpacity>
      ))}
    </View>
  </View>
  );

const Home = ({ navigation }: RouteProp) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalImage, setModalImage] = useState<ImageSourcePropType | null>(null);
    const [countryInfo, setCountryInfo] = useState(null);



    const handleDestinationPress = (destination: string) => {
        // navigation.navigate('DestinationDetails', { destination });
        let content = ''; // Default 
        let image = require('../../assets/VisaFinderLogo.png'); // Default
        let countryInfo = {
            region: 'North America', // Example data, replace with actual data
            gdpRank: '1',
            name: 'EB-5',
            processingTime: '730 days',
            governmentFees: '$3,765.00',
            sources: [
              {
                title: 'More information',
                url: 'https://example.com',
              },
            ],
          };
        // Customize the content based on the destination
        switch(destination) {
            case 'U.S.A.':
                content = `Visa information for the United States...
                            \nVisa Name: EB-5
                            \nApplication process: Meet requirements`;
                image = require('../../assets/multinationals_inc.jpg');
                countryInfo = {
                    region: 'North America',
                    gdpRank: '1',
                    name: 'EB-5',
                    processingTime: '730 days',
                    governmentFees: '$3,765.00',
                    sources: [
                      {
                        title: 'More information',
                        url: 'https://travel.state.gov/content/travel/en/us-visas.html',
                      },
                    ],
                  };
                break;
                case 'Canada':
                    content = `Discover Your Pathway to Canada...
                                \nVisa Name: Start-Up Visa
                                \nApplication Guidelines: Have a qualifying business, meet language requirements...`;
                    countryInfo = {
                        region: 'North America',
                        gdpRank: '10',
                        name: 'Start-Up Visa',
                        processingTime: '37 months',
                        governmentFees: 'CAD $2,140.00',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',
                            },
                        ],
                    };
                    break;
                case 'Mexico':
                    content = `Explore business opportunities in Mexico...
                                \nVisa Name: Temporary Resident (Investor)
                                \nApplication Guidelines: Provide proof of investment exceeding MXN $4,978,600...`;
                    countryInfo = {
                        region: 'North America',
                        gdpRank: '12',
                        name: 'Temporary Resident (Investor)',
                        processingTime: '1 month',
                        governmentFees: '$53.00 USD',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://consulmex.sre.gob.mx/',
                            },
                        ],
                    };
                    break;
                case 'China':
                    content = `China: The Gateway to Asia...
                                \nVisa Name: M Visa
                                \nVisa types for tourists, business visits, and long-term stays...`;
                    countryInfo = {
                        region: 'Asia',
                        gdpRank: '2',
                        name: 'M Visa',
                        processingTime: '4 Business Days',
                        governmentFees: '¥102.15 - ¥252.15',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://www.visaforchina.org/',
                            },
                        ],
                    };
                    break;
                case 'Italy':
                    content = `Discover Italy's Rich Cultural Heritage...
                                \nVisa Name: Investor Visa
                                \nApplication Guidelines: Requires a minimum investment of €250,000 in an innovative startup or €500,000 in an established company...`;
                    countryInfo = {
                        region: 'Southern Europe',
                        gdpRank: '8',
                        name: 'Investor Visa',
                        processingTime: '30 days',
                        governmentFees: '€50.00 - €100.00',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://vistoperitalia.esteri.it/home/en',
                            },
                        ],
                    };
                    break;
                case 'Spain':
                    content = `Sunny Days in Spain Await...
                                \nVisa Name: Golden Visa
                                \nApplication Guidelines: Requires an investment of at least €500,000 in Spanish real estate...`;
                    countryInfo = {
                        region: 'Southern Europe',
                        gdpRank: '14',
                        name: 'Golden Visa',
                        processingTime: '20 days',
                        governmentFees: '€70.00 - €150.00',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://www.exteriores.gob.es/',
                            },
                        ],
                    };
                    break;
                case 'France':
                    content = `France: The Gateway to Europe...
                                \nVisa Name: Talent Passport
                                \nApplication Guidelines: For highly skilled workers, investors, and company founders, requires proving the economic viability of the project...`;
                    countryInfo = {
                        region: 'Western Europe',
                        gdpRank: '6',
                        name: 'Talent Passport',
                        processingTime: '15-30 days',
                        governmentFees: '€99.00',
                        sources: [
                            {
                                title: 'More information',
                                url: 'https://france-visas.gouv.fr/',
                            },
                        ],
                    };
                    break;
                    case 'Nigeria':
                        content = `Explore Nigeria's Business Environment...
                                    \nVisa Name: N3A
                                    \nApplication Guidelines: Business visas are for those engaging in business activities...`;
                        countryInfo = {
                            region: 'Western Africa',
                            gdpRank: '39',
                            name: 'N3A',
                            processingTime: '15 business days',
                            governmentFees: 'Free',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://immigration.gov.ng/',
                                },
                            ],
                        };
                        break;
                    case 'Russia':
                        content = `Business and travel in Russia...
                                    \nVisa Name: Business Visa
                                    \nApplication Guidelines: Formal invitation from a Russian company required...`;
                        countryInfo = {
                            region: 'Eastern Europe',
                            gdpRank: '11',
                            name: 'Business Visa',
                            processingTime: '7-10 days',
                            governmentFees: '$160.00 USD',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://washington.mid.ru/en/',
                                },
                            ],
                        };
                        break;
                    case 'Germany':
                        content = `Germany: A Land of Innovation...
                                    \nVisa Name: D Visa
                                    \nApplication Guidelines: Includes a detailed business plan and proof of financial resources...`;
                        countryInfo = {
                            region: 'Western Europe',
                            gdpRank: '3',
                            name: 'D Visa',
                            processingTime: 'Several months to 1 year',
                            governmentFees: '€75.00',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://germany.info/',
                                },
                            ],
                        };
                        break;
                    case 'Algeria':
                        content = `Long-Term Opportunities in Algeria...
                                    \nVisa Name: Long-Term Visa
                                    \nApplication Guidelines: Must be sponsored by an Algerian resident or organization...`;
                        countryInfo = {
                            region: 'Northern Africa',
                            gdpRank: '56',
                            name: 'Long-Term Visa',
                            processingTime: '7 days',
                            governmentFees: '€25.00 - €100.00',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://algeria-visa.com/',
                                },
                            ],
                        };
                        break;
                    case 'Kenya':
                        content = `Experience Kenya...
                                    \nVisa Name: Lawful Residents (Category B)
                                    \nApplication Guidelines: Involves an extensive application process...`;
                        countryInfo = {
                            region: 'Eastern Africa',
                            gdpRank: '66',
                            name: 'Lawful Residents (Category B)',
                            processingTime: '3 years',
                            governmentFees: 'KES 600,000',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://immigration.go.ke/',
                                },
                            ],
                        };
                        break;
                    case 'South Africa':
                        content = `Invest in South Africa...
                                    \nVisa Name: Business Visa
                                    \nApplication Guidelines: Requires a substantial financial investment...`;
                        countryInfo = {
                            region: 'Southern Africa',
                            gdpRank: '41',
                            name: 'Business Visa',
                            processingTime: '3-4 weeks',
                            governmentFees: 'ZAR 1,520.00',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://www.southafrica.net/',
                                },
                            ],
                        };
                        break;
                    case 'Australia':
                        content = `Business Innovation in Australia...
                                    \nVisa Name: Business Innovation
                                    \nApplication Guidelines: Requires detailed business proposals and proof of business management experience...`;
                        countryInfo = {
                            region: 'Australia',
                            gdpRank: '14',
                            name: 'Business Innovation',
                            processingTime: '26 days',
                            governmentFees: 'AUD 3,310.00',
                            sources: [
                                {
                                    title: 'More information',
                                    url: 'https://immi.homeaffairs.gov.au/',
                                },
                            ],
                        };
                        break; 
                        case 'Japan':
                            content = `Explore Business and Culture in Japan...
                                        \nVisa Name: Business Visa
                                        \nApplication Guidelines: Requires an invitation letter from a Japanese company and confirmed hotel bookings...
                                        \nRequired Documents: Passport, completed application form, photo, proof of financial means, detailed itinerary.`;
                            //image = require('../../assets/japan-removebg-preview.png');  
                            countryInfo = {
                                region: 'Asia',
                                gdpRank: '3',
                                name: 'Business Visa',
                                processingTime: '5-10 Business Days',
                                governmentFees: '¥3,000',
                                sources: [
                                    {
                                        title: 'More information',
                                        url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
                                    },
                                ],
                            };
                            break;                
                    // Add more destinations as needed
                    default:
                        content = "Please select a destination for more information.";
                        break;
                }
                
        

    setModalContent(content); // Update modal content
    setModalImage(image); // Update modal image
    setCountryInfo(countryInfo);
    setIsModalVisible(true); // Show the modal

    };

    // @ts-ignore
    const renderItem = ({ item }) => {

        if (item.type === 'header') {
            return(
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome to VisaExplorer</Text>
                    <TouchableRipple
                    style={styles.iconButton}
                    onPress={() => navigation.openDrawer()}
                    rippleColor="rgba(0, 0, 0, .32)"
                    borderless={true}
                    >
                    <Ionicons name="menu-outline" size={30} color="#FFFFFF" />
                    </TouchableRipple>
                </View>

                
            );
        } else if (item.type === 'headerImage') {
            return (
                <Image source={require('../../assets/istockphoto-1206200939-612x612.jpg')} style={styles.headerImage}/>
            )
        
        
        } else if (item.type === 'popularDestinations') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Destinations</Text>
                    <FlatList
                        data={popularDestinations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.destination}
                                onPress={() => handleDestinationPress(item.name)}
                            >   
                                <Image source={item.image} style={styles.destinationImage} />
                                <Text style={styles.destinationText }>{item.name}</Text>
                                
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            );{/*else if (item.type === 'featuredDestinations') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Destinations</Text>
                    <View style={styles.destinationList}>
                        <TouchableOpacity style={styles.destination} onPress={() => handleDestinationPress('United States')}>
                            <Text style={styles.destinationText} >United States</Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.destination} onPress={() => handleDestinationPress('Canada')}>
                            <Text style={styles.destinationText}>Canada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.destination} onPress={() => handleDestinationPress('United Kingdom')}>
                            <Text style={styles.destinationText}>United Kingdom</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            );*/}
        } else if (item.type === 'visaRequirements') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Visa Recommendations</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Visa Recommendation')}>
                        <Text style={styles.buttonText}>Get Visa Recommendation Here</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (item.type === 'about') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About VisaExplorer</Text>
                    <Text style={styles.sectionDescription}>
                        VisaExplorer is a comprehensive platform that provides up-to-date information and guidance on visa requirements for various destinations around the world. Whether you're planning a business trip, a vacation, or relocating, we've got you covered.
                    </Text>
                </View>
            );
            {/*else if (item.type === 'explore') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Explore More</Text>
                </View>
            );
        }*/}
        }  else if (item.type === 'popularDestinations') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Destinations</Text>
                    <FlatList
                        data={popularDestinations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.destination}
                                onPress={() => handleDestinationPress(item.name)}
                            >   
                                <Image source={item.image} style={styles.destinationImage} />
                                {//<Text style={styles.destinationText }>{item.name}</Text>
                                }
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            );
        } else if (item.type === 'travelTips') {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Travel Tips</Text>
                    <FlatList
                        data={travelTips}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.travelTipContainer}>
                                <Text style={styles.travelTipTitle}>{item.title}</Text>
                                <Text style={styles.travelTipDescription}>{item.description}</Text>
                            </View>
                        )}
                    />
                </View>
            );
        }
        return null;
    };

    const data = [
        { type: 'header' },
        { type: 'headerImage' },
        { type: 'popularDestinations' },
        { type: 'featuredDestinations' },
        { type: 'visaRequirements' },
        { type: 'about' },
        { type: 'explore' }, 
        { type: 'travelTips' },
    ];

    return (
        <View style={styles.container}>

          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={FooterComponent} // Fototer here
          
          />
          <DestinationModal
            isVisible={isModalVisible}
            onClose={() => {setIsModalVisible(false);
                setCountryInfo(null); // reseting
            }}
            content={modalContent}
            imageSource={modalImage}
            countryInfo={countryInfo}
            />
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        backgroundColor: '#ffffff'
    },
    header: {
        position: 'relative',
        backgroundColor: '#225475',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 40,
    },
    iconButton: {
        padding: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 110,
        paddingRight: 40,
    },
    headerImage:{
        marginTop: 20,
        height: 200,
        width: 400,
    },
    section: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    sectionTitle: {
        textAlign: 'center',
        color: '#1b2c56',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    destinationList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        alignContent: 'center',
    },
    destination: {
        backgroundColor: '#f5f6f7',//'#D1DADC', // Use white for a cleaner, more professional look
        padding: 5, // Adjust padding for better content space
        //paddingTop: 10,

        borderRadius: 5, // Rounded corners for a modern look
        //marginRight: 15,
        marginBottom: 10,
        elevation: 6, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.5, // Shadow opacity for iOS
        shadowRadius: 6, // Shadow blur radius for iOS
        alignItems: 'center', // Center items inside the button
        //justifyContent: 'center', // Center content vertically
        minWidth: 150, // Minimum width for each destination button
        height: 210, // Fixed height for uniformity
        overflow: 'hidden',
        marginHorizontal: 7,
        //align: 'center',
    },
    destinationImage: {
        //position: 'absolute',
        verticalAlign: 'top',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        //backgroundColor: '#f5f6f7',
    },
    destinationText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#042b88', 
        verticalAlign: 'bottom', 
        //textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    button: {
        backgroundColor: '#3d785b',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    sectionDescription: {
        fontSize: 16,
        lineHeight: 24,
    },
    exploreImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    logoutContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    /* Simply a test,  not actually used in the app */
    travelTipContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 6, // Shadow blur radius for iOS
        
    },
    travelTipTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        backgroundColor: '#3d785b',
        borderRadius: 5,
        padding: 1,
        paddingLeft: 3,
    },

    travelTipDescription: {
        fontSize: 14,
        lineHeight: 20,
        //backgroundColor: '#f2f7fc',
        padding: 1,
        paddingLeft: 3,
        //alignItems: 'center',
        //textAlign: 'center',
    },
    sidebarButton: {
        position: 'absolute',
        top: 60,
        right: 10,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        zIndex: 999,
        elevation: 20,
    },
    // Adding footer styles here
    footerContainer: {
        padding: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E1E1E1',
        elevation: 1,
    },
    footerImage: {
        width: '110%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginVertical: 5,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginTop: 10,
        //elevation: 20,
    },
    // Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 100
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    // Overlay for blur -- ANDROID
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust the opacity as needed
    },

});

const popularDestinations = [
    { id: 1, name: 'France', image: require('../../assets/france-removebg-preview.png')},
    { id: 2, name: 'Italy', image: require('../../assets/italy-removebg-preview.png')},
    { id: 3, name: 'Spain', image: require('../../assets/spain-removebg-preview.png')},
    { id: 4, name: 'Germany', image: require('../../assets/germany-removebg-preview.png')},
    { id: 5, name: 'Japan', image: require('../../assets/japan-removebg-preview.png') },
    { id: 6, name: 'U.S.A.', image: require('../../assets/UnitedStates-removebg.png') },
    { id: 7, name: 'Canada', image: require('../../assets/canada-removebg-preview.png')},
    { id: 8, name: 'Mexico', image: require('../../assets/mexico-removebg-preview.png')},
    { id: 9, name: 'China', image: require('../../assets/china-removebg-preview.png')},
    { id: 10, name: 'Nigeria', image: require('../../assets/nigeria-removebg-preview.png')},
    { id: 11, name: 'Russia', image: require('../../assets/russia-removebg-preview.png')},
    { id: 12, name: 'Algeria', image: require('../../assets/algeria-removebg-preview.png')},
    { id: 13, name: 'Kenya', image: require('../../assets/kenya-removebg-preview.png')},
    { id: 14, name: 'South Africa', image: require('../../assets/southafrica-removebg-preview.png')},
    { id: 15, name: 'Australia', image: require('../../assets/australia-removebg-preview.png')},
];

const travelTips = [
    {
        id: 1,
        title: 'Check for Travel Advisories',
        description: 'Before traveling, check your government’s travel advisories for safety information and travel warnings specific to the country you are visiting.',
    },
    {
        id: 2,
        title: 'Organize Travel Documents',
        description: 'Ensure that all your travel documents, including passports, visas, and insurance papers, are up to date and organized in one place. Consider using a travel document organizer.',
    },
    {
        id: 3,
        title: 'Pack Smart',
        description: 'Pack a business attire that suits the local business culture, as well as adapters and chargers compatible with local outlets.',
    },
    {
        id: 4,
        title: 'Financial Preparation',
        description: 'Notify your bank of your travel plans to avoid any fraud alerts or blocked transactions. Understand the local currency and exchange rates.',
    },
   
    
];

export default Home;

