import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LineChart } from "react-native-chart-kit";

export default class ResultScreen extends React.Component {
  backToHome = () => {
    this.props.navigation.navigate("FormScreen");
  };

  render() {
    const { totalShares, totalDividends, snowballShares, monthsData } =
      this.props.route.params;

    return (
      <View style={styles.container}>
        <AntDesign
          style={styles.backPageIcon}
          onPress={this.backToHome}
          name="back"
          size={24}
          color="black"
        />
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              datasets: [
                {
                  data: monthsData.dividends,
                  color: () => "#ED8F12",
                  strokeWidth: 2,
                },
              ],
            }}
            width={400}
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForBackgroundLines: {
                stroke: "#ffffff",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.label}>Rendimento mensal</Text>
            <Text style={styles.value}>R${totalDividends}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.label}>Total de cotas</Text>
            <Text style={styles.value}>{totalShares} cotas</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.label}>
              Novas cotas (Caso reinvista o rendimento)
            </Text>
            <Text style={styles.value}>{snowballShares} cotas</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
    marginTop: "25%",
  },
  resultContainer: {
    marginTop: -20,
    width: "100%",
    paddingHorizontal: 24,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
  },
  value: {
    fontSize: 18,
    color: "#333333",
  },
  backPageIcon: {
    position: "absolute",
    top: 55,
    left: 16,
  },
});
