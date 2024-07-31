import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default class HomePage extends React.Component {
  handleStartPress = () => {
    this.props.navigation.navigate("FormScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/img/home-image.png")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Aumente sua renda imobiliária</Text>
            <Text style={styles.heroSubtitle}>Simule a renda potencial</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              O que você pode fazer com este aplicativo
            </Text>
            <Text style={styles.sectionSubtitle}>
              Simular sua renda potencial com fundos imobiliários
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={this.handleStartPress}
          >
            <Text style={styles.footerButtonText}>Começar a simulação</Text>
          </TouchableOpacity>
          <Text style={styles.footerNote}>
            Investir envolve riscos, incluindo possível perda do principal. Este
            aplicativo não tem a intenção de fornecer conselhos de investimento.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 48,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    backgroundColor: "transparent",
  },
  hero: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  heroImage: {
    borderRadius: 16,
    overlayColor: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4))",
  },
  heroTextContainer: {
    marginBottom: 16,
  },
  heroTitle: {
    color: "#171412",
    fontSize: 32,
    fontFamily: "Work-Sans-Bold",
  },
  heroSubtitle: {
    color: "#171412",
    fontSize: 14,
    fontFamily: "Work-Sans-Bold",
  },
  heroButton: {
    backgroundColor: "#ec8e13",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heroButtonText: {
    color: "#181511",
    fontFamily: "Work-Sans-Bold",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: "Work-Sans-Bold",
    color: "#181511",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#181511",
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e6e1db",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: "48%",
  },
  featureTextContainer: {
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181511",
  },
  featureDescription: {
    fontSize: 14,
    color: "#897861",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
  },
  footerButton: {
    backgroundColor: "#ED8F12",
    borderRadius: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    color: "#181511",
    fontWeight: "bold",
  },
  footerNote: {
    color: "#897861",
    fontSize: 12,
    marginTop: 8,
    fontFamily: "Work-Sans-Bold",
  },
});
