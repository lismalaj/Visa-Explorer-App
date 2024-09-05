
import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, ImageSourcePropType, Animated, ScrollView, Linking} from 'react-native';


interface CountryInfo{
    region: string;
    gdpRank: string;
    name: string;
    processingTime: string;
    governmentFees: string;
    sources: { title: string; url: string }[];
}

interface DestinationModalProps {
  isVisible: boolean;
  onClose: () => void;
  content: string;
  imageSource: ImageSourcePropType | null;
  countryInfo?: CountryInfo;
}

const DestinationModal = ({ isVisible, onClose, content, imageSource, countryInfo }: DestinationModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for the fade-in effect
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial position for the slide-up effect

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          speed: 10,
          bounciness: 8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) slideAnim.setValue(300); // Reset position after hide
      });
    }
  }, [isVisible]);
  
  const renderSourceLinks = (sources) => {
    return sources.map((source, index) => (
      <TouchableOpacity key={index} onPress={() => Linking.openURL(source.url)}>
        <Text style={styles.sourceLink}>{source.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalView,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {imageSource ? (
            <Animated.Image
              source={imageSource}
              style={[styles.modalImage, { opacity: fadeAnim }]}
            />
          ) : (
            <Text>No Image Provided</Text>
          )}

          <Animated.Text style={[styles.modalText, { opacity: fadeAnim }]}>
            {content}
          </Animated.Text>

          {/* Render country information if it exists <Text style={styles.countryInfoText}>
                Region: {countryInfo.region}
              </Text>
              <Text style={styles.countryInfoText}>
                GDP Rank: {countryInfo.gdpRank}
              </Text>
              <Text style={styles.countryInfoText}>
                Visa Name: {countryInfo.name}
              </Text>
              <Text style={styles.countryInfoText}>
                Processing Time: {countryInfo.processingTime}
              </Text>
              <Text style={styles.countryInfoText}>
                Government Fees: {countryInfo.governmentFees}
              </Text>
              {renderSourceLinks(countryInfo.sources)}*/}
          {countryInfo && (
            <View style={styles.countryInfoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Region:</Text>
                <Text style={styles.infoContent}>{countryInfo.region}</Text>
              </View>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>GDP Rank:</Text>
                  <Text style={styles.infoContent}>{countryInfo.gdpRank}</Text>
              </View>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Visa Name:</Text>
                  <Text style={styles.infoContent}>{countryInfo.name}</Text>
              </View>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Processing Time:</Text>
                  <Text style={styles.infoContent}>{countryInfo.processingTime}</Text>
              </View>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Government Fees:</Text>
                  <Text style={styles.infoContent}>{countryInfo.governmentFees}</Text>
              </View>
              <View style={styles.sourcesContainer}>
                  {renderSourceLinks(countryInfo.sources)}
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: '#e8f4ff',//#a5d3ff', //'#bfa8ff', 
    borderRadius: 15, 
    padding: 25, 
    alignItems: 'center',
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 150, 
    borderRadius: 10, 
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#364654',//'#4a90e2', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, 
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9', 
    borderWidth: 2, 
    borderColor: 'white', 
    borderStyle: 'solid',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  },
  countryInfoContainer: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#f0f0f0', // Lighter 
    borderRadius: 10,
    width: '100%', // Full width
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2, 
    borderColor: 'white', 
    borderStyle: 'solid',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#2a2f43',
    fontWeight: '600', // Slightly less bold 
  },
  infoContent: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'right',
    flex: 1, // Allows text to wrap if necessary
  },
  sourceLink: {
    color: '#007aff', // iOS-style link color
    textDecorationLine: 'underline',
  },
  sourcesContainer: {
    marginTop: 10,
    width: '100%', // Ensure alignment
  },
});


export default DestinationModal;
