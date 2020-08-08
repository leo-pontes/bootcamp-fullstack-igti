import React, { useState, useEffect } from "react";
import mesesAno from "./mesesAno";

function FiltroMes({ mesInicial, retornoEscolha }) {
    const [listaMesesAno, setListaMesesAno] = useState([]);
    const [mesSelect, setMesSelect] = useState("");

    useEffect(() => {
        setListaMesesAno(mesesAno);
        setMesSelect(mesInicial);
    }, [mesInicial]);

    const handleButtons = (event) => {
        let idxMes = mesesAno.findIndex((element) => element[0] === mesSelect);

        if (event.target.id === "btnMais") {
            if (idxMes === mesesAno.length - 1) return;
            idxMes = ++idxMes;
        } else {
            if (idxMes === 0) return;
            idxMes = --idxMes;
        }

        const newMes = mesesAno.find((_, index) => index === idxMes)[0];

        setMesSelect(newMes);

        repassaValorNovo(newMes);
    };

    const handleSelectChange = ({ target }) => {
        setMesSelect(target.value);
        repassaValorNovo(target.value);
    };

    const repassaValorNovo = (newValue) => {
        retornoEscolha(newValue);
    };

    return (
        <div style={styles.flexRow}>
            <button
                id="btnMenos"
                className="waves-effect waves-lights btn"
                style={styles.buttons}
                onClick={handleButtons}
            >
                {"<"}
            </button>
            <div className="input-field col s12">
                <select
                    className="browser-default"
                    value={mesSelect}
                    onChange={handleSelectChange}
                >
                    {listaMesesAno.map((element, index) => {
                        return (
                            <option key={index} value={element[0]}>
                                {element[1]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button
                id="btnMais"
                className="waves-effect waves-lights btn"
                style={styles.buttons}
                onClick={handleButtons}
            >
                {">"}
            </button>
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
    buttons: {
        margin: "10px",
        marginTop: "15px",
    },
};

export default FiltroMes;
