import React from "react";

function FiltroTransacao({ handleFiltraTransacao, handleAdicionar }) {
    const handleAdd = () => {
        handleAdicionar();
    };

    const handleFilter = ({ target }) => {
        handleFiltraTransacao(target.value);
    };

    return (
        <div className="container" style={styles.flexRow}>
            <button
                id="btnMenos"
                className="waves-effect waves-lights btn"
                style={styles.btn}
                onClick={handleAdd}
            >
                {"+ADICIONAR"}
            </button>
            <input type="text" onChange={handleFilter} />
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
    btn: {
        width: "300px",
        marginRight: "10px",
    },
};

export default FiltroTransacao;
