import React, { Component } from "react";
import ProgressBar from "./components/progressBar/ProgressBar";
import Salary from "./components/salary/Salary";
import Header from "./components/header/Header";
import { calculateSalaryFrom } from "./helpers/salaryHelper";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            salarioBruto: 1000,
            salarioLiquido: 925,
            percSalarioLiquido: 92.5,
            baseInss: 1000,
            percInss: 7.5,
            inss: 75,
            baseIrpf: 925,
            percIrpf: 0,
            irpf: 0,
        };
    }

    handleChangeFilter = (newFilter) => {
        if (newFilter == 0 || newFilter == undefined || newFilter == null) {
            this.setState({
                salarioBruto: "",
                salarioLiquido: 0,
                percSalarioLiquido: 0,
                baseInss: 0,
                percInss: 0,
                inss: 0,
                baseIrpf: 0,
                percIrpf: 0,
                irpf: 0,
            });
        } else {
            const newValue = calculateSalaryFrom(newFilter);

            const {
                baseINSS,
                discountINSS,
                baseIRPF,
                discountIRPF,
                netSalary,
            } = newValue;

            const percInss = (discountINSS * 100) / newFilter;
            const percIrpf = (discountIRPF * 100) / newFilter;
            const percSalarioLiquido = (netSalary * 100) / newFilter;

            this.setState({
                salarioBruto: newFilter,
                salarioLiquido: netSalary,
                percSalarioLiquido,
                baseInss: baseINSS,
                percInss,
                inss: discountINSS,
                baseIrpf: baseIRPF,
                percIrpf,
                irpf: discountIRPF,
            });
        }
    };

    render() {
        const {
            salarioBruto,
            salarioLiquido,
            percSalarioLiquido,
            baseInss,
            percInss,
            inss,
            baseIrpf,
            percIrpf,
            irpf,
        } = this.state;

        return (
            <div className="container">
                <h1 style={styles.centeredTitle}>React Salário</h1>
                <Header
                    filter={salarioBruto}
                    onChangeFilter={this.handleChangeFilter}
                />
                <Salary
                    baseInss={baseInss}
                    salarioLiquido={salarioLiquido}
                    percSalarioLiquido={percSalarioLiquido}
                    percInss={percInss}
                    inss={inss}
                    baseIrpf={baseIrpf}
                    percIrpf={percIrpf}
                    irpf={irpf}
                />
                <ProgressBar
                    percSalarioLiquido={percSalarioLiquido}
                    percInss={percInss}
                    percIrpf={percIrpf}
                />
            </div>
        );
    }
}

const styles = {
    centeredTitle: {
        textAlign: "center",
    },
};
