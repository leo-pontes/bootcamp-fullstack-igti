import React, { Component } from "react";
import css from "./progressBar.module.css";

export default class ProgressBar extends Component {
    render() {
        const { percSalarioLiquido, percInss, percIrpf } = this.props;

        let tamanhoSalarioLiquido = { width: percSalarioLiquido + "%" };
        let tamanhoInss = { width: percInss + "%" };
        let tamanhoIrpf = { width: percIrpf + "%" };

        return (
            <div className={css.divProgress}>
                <div className={css.progressInss} style={tamanhoInss}></div>
                <div className={css.progressIrpf} style={tamanhoIrpf}></div>
                <div
                    className={css.progressSalarioLiquido}
                    style={tamanhoSalarioLiquido}
                ></div>
            </div>
        );
    }
}
