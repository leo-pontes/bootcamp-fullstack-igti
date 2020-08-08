import React from "react";

export default function Header({
    valorInicial,
    taxaJurosMensal,
    periodoMeses,
    onChange,
}) {
    const handleInputChange = (event) => {
        onChange(event.target.id, event.target.value);
    };

    return (
        <div style={styles.flexRow}>
            <div className="input-field" style={styles.inputs}>
                <input
                    id="inputValorInicial"
                    type="number"
                    min="0"
                    max="100000"
                    step="1"
                    autoFocus
                    value={valorInicial}
                    onChange={handleInputChange}
                />
                <label className="active" htmlFor="inputValorInicial">
                    Montante Inicial:
                </label>
            </div>

            <div className="input-field" style={styles.inputs}>
                <input
                    id="inputTaxaJuros"
                    type="number"
                    min="-12"
                    max="12"
                    step="0.1"
                    autoFocus
                    value={taxaJurosMensal}
                    onChange={handleInputChange}
                />
                <label className="active" htmlFor="inputTaxaJuros">
                    Taxa de Juros Mensal:
                </label>
            </div>

            <div className="input-field" style={styles.inputs}>
                <input
                    id="inputPeriodo"
                    type="number"
                    min="1"
                    max="36"
                    step="1"
                    autoFocus
                    value={periodoMeses}
                    onChange={handleInputChange}
                />
                <label className="active" htmlFor="inputPeriodo">
                    Período (Meses):
                </label>
            </div>
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignIntems: "center",
        justifyContent: "center",
        marginBotton: "40px",
    },
    inputs: {
        margin: "20px",
        padding: "20px",
        width: "33%",
    },
};
