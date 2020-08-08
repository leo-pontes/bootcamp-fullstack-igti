import React from "react";
import {
    formatMoney,
    formatMoneyPositiveNegative,
    formatPercent,
} from "../../../helpers/formatters";

export default function Parcela({ parcelaAtual }) {
    const { id, value, difference, percentage } = parcelaAtual;

    return (
        <div style={styles.quadradinho}>
            <div style={styles.flexRow}>
                <div style={styles.id}>
                    <label>{id}</label>
                </div>
                <div style={styles.flexCol}>
                    <label>{formatMoney(value)}</label>
                    <label>{formatMoneyPositiveNegative(difference)}</label>
                    <label>{formatPercent(percentage)}</label>
                </div>
            </div>
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignIntems: "left",
        justifyContent: "center",
    },
    quadradinho: {
        border: "1px solid gray",
        borderRadius: "5%",
        margin: "15px",
        padding: "5px",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
        alignIntems: "center",
        justifyContent: "center",
        marginBotton: "40px",
        padding: "5px",
    },
    id: {
        backgroundColor: "green",
        padding: "5px",
    },
};
