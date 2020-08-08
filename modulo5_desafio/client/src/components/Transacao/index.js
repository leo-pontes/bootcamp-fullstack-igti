import React from "react";
import Action from "../Action";
import { formatMoney } from "../../helpers/formatters";

const Transacao = ({ id, dia, nome, descricao, valor, handleAcao }) => {
    const handleActionClick = (id, type) => handleAcao(id, type);

    return (
        <div className="container">
            <div style={styles.flexRow}>
                <div>
                    <label>Dia: {dia}</label>
                </div>
                <div style={styles.flexCol}>
                    <label style={styles.title}>{nome}</label>
                    <label>{descricao}</label>
                </div>
                <div style={styles.flexRow}>
                    <div>
                        <label>{formatMoney(valor)}</label>
                    </div>
                    <div style={styles.btns}>
                        <Action
                            id={id}
                            onActionClick={handleActionClick}
                            type="edit"
                        />
                        <Action
                            id={id}
                            onActionClick={handleActionClick}
                            type="delete"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignIntems: "center",
        justifyContent: "space-between",
        marginBotton: "40px",
    },
    title: {
        fontSize: "1.3rem",
        fontWeight: "bold",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBotton: "40px",
        padding: "5px",
    },
    btns: {
        paddingLeft: "15px",
    },
};

export default Transacao;
