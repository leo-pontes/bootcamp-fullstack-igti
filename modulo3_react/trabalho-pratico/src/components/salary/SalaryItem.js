import React, { Component } from "react";
import css from "./salary.module.css";

export default class SalaryItem extends Component {
    render() {
        const { estilo, label, value } = this.props;

        return (
            <div className={`${css.salary} ${css.border}`}>
                <label style={estilo}>{label}</label>
                <input
                    style={estilo}
                    type="text"
                    readOnly="True"
                    value={value}
                />
            </div>
        );
    }
}
