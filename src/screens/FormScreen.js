import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default class FormScreen extends React.Component {
  state = {
    monthlyInvestment: "",
    pricePerShare: "",
    dividendPerShare: "",
    investmentPeriod: "",
  };

  backToHome = () => {
    this.props.navigation.navigate("AppHome");
  };

  formatInput = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d)(\d{2})$/, "$1,$2") // Coloca a vírgula antes dos últimos 2 dígitos
      .replace(/(?=(\d{3})+(\D))\B/g, "."); // Coloca o ponto a cada 3 dígitos
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: this.formatInput(value) });
  };

  validarEntrada = () => {
    const {
      monthlyInvestment,
      pricePerShare,
      dividendPerShare,
      investmentPeriod,
    } = this.state;
    if (
      monthlyInvestment === "" ||
      pricePerShare === "" ||
      dividendPerShare === "" ||
      investmentPeriod === ""
    ) {
      Alert.alert("Erro ao calcular", "Por favor, preencha todos os campos!");
      return false;
    }
    return true;
  };

  calculateInvestment = () => {
    const {
      monthlyInvestment,
      pricePerShare,
      dividendPerShare,
      investmentPeriod,
    } = this.state;

    const investmentMonths = parseInt(investmentPeriod.replace(",", "."), 10);
    const monthlyInvestmentAmount = parseFloat(
      monthlyInvestment.replace(/\./g, "").replace(",", ".")
    );
    const sharePrice = parseFloat(
      pricePerShare.replace(/\./g, "").replace(",", ".")
    );
    const shareDividend = parseFloat(
      dividendPerShare.replace(/\./g, "").replace(",", ".")
    );

    let totalShares = 0;
    let totalDividends = 0;
    let snowballShares = 0;

    const monthsData = {
      months: [],
      shares: [],
      dividends: [],
      reinvestedShares: [],
    };

    for (let month = 1; month <= investmentMonths; month++) {
      // Compra de novas cotas com o investimento mensal
      let newShares = Math.floor(monthlyInvestmentAmount / sharePrice);
      totalShares += newShares;

      // Cálculo dos rendimentos do mês
      let monthlyDividends = totalShares * shareDividend;
      totalDividends = monthlyDividends;

      // Reinvestimento dos rendimentos
      if (totalDividends >= sharePrice) {
        let reinvestedShares = Math.floor(totalDividends / sharePrice);
        snowballShares += reinvestedShares;
      }

      monthsData.months.push(`${month}º ano`);
      monthsData.shares.push(totalShares);
      monthsData.dividends.push(totalDividends);
      monthsData.reinvestedShares.push(snowballShares);
    }

    this.props.navigation.navigate("ResultScreen", {
      totalShares: totalShares.toFixed(0),
      totalDividends: totalDividends.toFixed(2),
      snowballShares: snowballShares.toFixed(0),
      currentMonth: investmentMonths,
      monthsData, // Passando os dados para a tela de resultados
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <AntDesign
          style={styles.backPageIcon}
          onPress={this.backToHome}
          name="back"
          size={24}
          color="black"
        />
        <Text style={styles.inputText}> Investimento Mensal </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 2.000,00"
          keyboardType="numeric"
          value={this.state.monthlyInvestment}
          onChangeText={(text) =>
            this.handleInputChange("monthlyInvestment", text)
          }
        />
        <Text style={styles.inputText}> Preço por Cota </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 10,00"
          keyboardType="numeric"
          value={this.state.pricePerShare}
          onChangeText={(text) => this.handleInputChange("pricePerShare", text)}
        />
        <Text style={styles.inputText}> Rendimento por Cota </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 1,50"
          keyboardType="numeric"
          value={this.state.dividendPerShare}
          onChangeText={(text) =>
            this.handleInputChange("dividendPerShare", text)
          }
        />
        <Text style={styles.inputText}> tempo em meses </Text>
        <TextInput
          style={styles.input}
          placeholder="6"
          keyboardType="numeric"
          value={this.state.investmentPeriod}
          onChangeText={(text) => this.setState({ investmentPeriod: text })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.validarEntrada()) {
              this.calculateInvestment();
            }
          }}
        >
          <Text style={styles.buttonText}>Simular investimento</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderColor: "#E6E0DB",
    borderWidth: 1,
    borderRadius: 12,
    margin: 8,
  },
  inputText: {
    fontSize: 24,
    fontFamily: "Work-Sans-Regular",
  },
  button: {
    width: "80%",
    backgroundColor: "#ED8F12",
    borderRadius: 16,
    marginTop: 15,
    paddingVertical: 12,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#181511",
    fontWeight: "bold",
    fontFamily: "Work-Sans-Bold",
  },
  backPageIcon: {
    position: "absolute",
    top: 55,
    left: 16, // fixed value for left position
  },
});
