import React from "react";
import Transacao from "../Transacao";

export default function ListaTransacao({
    listaTrans,
    handleEditar,
    handleDelete,
}) {
    const handleAcao = (id, type) => {
        const trans = listaTrans.find((element) => element._id === id);
        if (type === "delete") handleDelete(trans);
        else handleEditar(trans);
    };

    return (
        <div className="container">
            {listaTrans.map((element, index) => {
                return (
                    <div style={styles.flexRow} key={index}>
                        <Transacao
                            id={element._id}
                            dia={element.day}
                            nome={element.category}
                            descricao={element.description}
                            valor={element.value}
                            handleAcao={handleAcao}
                        />
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        border: "1px solid gray",
        margin: "5px",
        padding: "5px",
    },
};
