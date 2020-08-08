import React from "react";
import {
    formatMoney,
    formatMoneyPositiveNegative,
} from "../../helpers/formatters";

function Resumo({ qtde, receita, despesa, saldo }) {
    return (
        <div className="container" style={styles.flexRow}>
            <label>Lançamentos: {qtde}</label>
            <label>Receitas: {formatMoney(receita)}</label>
            <label>Despesas: {formatMoney(despesa)}</label>
            <label>Saldo: {formatMoneyPositiveNegative(saldo)}</label>
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "25px",
    },
};

export default Resumo;
