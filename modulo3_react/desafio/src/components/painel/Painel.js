import React from "react";
import Parcela from "./parcela/Parcela";

export default function Painel({ parcelas }) {
    return (
        <div style={styles.flexRow}>
            {parcelas.map((parcela) => {
                return <Parcela key={parcela.id} parcelaAtual={parcela} />;
            })}
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        width: "100%",
    },
};
