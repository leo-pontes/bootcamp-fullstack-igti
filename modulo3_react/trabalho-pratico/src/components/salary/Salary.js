import React, { Component } from "react";
import css from "./salary.module.css";
import SalaryItem from "./SalaryItem";
import { format, formatCurrency } from "../../helpers/formatHelpers";

export default class Salary extends Component {
    render() {
        const {
            salarioLiquido,
            percSalarioLiquido,
            baseInss,
            percInss,
            inss,
            baseIrpf,
            percIrpf,
            irpf,
        } = this.props;

        return (
            <div className={`${css.border} ${css.flexRow}`}>
                <SalaryItem
                    key="1"
                    label="Base INSS:"
                    value={formatCurrency(baseInss)}
                />
                <SalaryItem
                    estilo={{ color: "#e67e22" }}
                    key="2"
                    label="Desconto INSS:"
                    value={`${formatCurrency(inss)} (${format(percInss)}%)`}
                />
                <SalaryItem
                    key="3"
                    label="Base IRPF:"
                    value={formatCurrency(baseIrpf)}
                />
                <SalaryItem
                    estilo={{ color: "#c0392b" }}
                    key="4"
                    label="Desconto IRPF:"
                    value={`${formatCurrency(irpf)} (${format(percIrpf)}%)`}
                />
                <SalaryItem
                    estilo={{ color: "#16a085" }}
                    key="5"
                    label="Salário Líquido:"
                    value={`${formatCurrency(salarioLiquido)} (${format(
                        percSalarioLiquido
                    )}%)`}
                />
            </div>
        );
    }
}
