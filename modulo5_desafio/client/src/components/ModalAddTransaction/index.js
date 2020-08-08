import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { leftPad } from "../../helpers/formatters";

Modal.setAppElement("#root");

function ModalAddTransaction({ onSave, onClose, selectedTransaction }) {
    const {
        _id,
        description,
        value,
        category,
        yearMonthDay,
        type,
    } = selectedTransaction;

    const [_description, set_description] = useState(description);
    const [_value, set_value] = useState(value);
    const [_category, set_category] = useState(category);
    const [_yearMonthDay, set_yearMonthDay] = useState(() => {
        if (yearMonthDay === "") return undefined;

        const data = new Date(yearMonthDay);
        return data.toISOString().slice(0, 10);
    });
    const [_type, set_type] = useState(type);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleDesc = ({ target }) => {
        set_description(target.value);
    };

    const handleValue = ({ target }) => {
        set_value(target.value);
    };

    const handleCategory = ({ target }) => {
        set_category(target.value);
    };

    const handleData = ({ target }) => {
        set_yearMonthDay(target.value);
    };

    const handleType = ({ target }) => {
        if (target.id === "rdReceita1") set_type("+");
        else set_type("-");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") onClose(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = new Date(_yearMonthDay);

        onSave({
            _id,
            description: _description,
            value: parseInt(_value),
            category: _category,
            year: data.getFullYear() + "",
            month: leftPad(data.getMonth() + 1, 2) + "",
            day: data.getDate() + "",
            yearMonth:
                data.getFullYear() + "-" + leftPad(data.getMonth() + 1, 2),
            yearMonthDay: data,
            type: _type,
        });
    };

    const handleModalClose = (event) => {
        onClose(null);
    };

    return (
        <div className="container">
            <Modal isOpen={true}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>Lançamento</span>
                    <button
                        className="waves-effect waves-lights btn red dark-4"
                        onClick={handleModalClose}
                    >
                        X
                    </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="input-radio" style={{ margin: "30px" }}>
                        <label style={{ marginRight: "30px" }}>
                            <input
                                id="rdReceita1"
                                name="rdTipo"
                                type="radio"
                                checked={_type === "+"}
                                onChange={handleType}
                            />
                            <span>Receita</span>
                        </label>

                        <label>
                            <input
                                id="rdDespesa1"
                                name="rdTipo"
                                type="radio"
                                checked={_type === "-"}
                                onChange={handleType}
                            />
                            <span>Despesa</span>
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputDesc"
                            type="text"
                            value={_description}
                            onChange={handleDesc}
                        />
                        <label className="active" htmlFor="inputDesc">
                            Descrição:
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputNome"
                            type="text"
                            value={_category}
                            onChange={handleCategory}
                        />
                        <label className="active" htmlFor="inputNome">
                            Categoria:
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputValor"
                            type="number"
                            min={0}
                            step="1"
                            value={_value}
                            onChange={handleValue}
                        />
                        <label className="active" htmlFor="inputValor">
                            Valor:
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            id="inputData"
                            type="date"
                            onChange={handleData}
                            value={_yearMonthDay}
                        />
                        <label className="active" htmlFor="inputData">
                            Data:
                        </label>
                    </div>
                    <div style={styles.flexRow}>
                        <button className="waves-effect waves-lights btn">
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

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
    errorMessage: {
        color: "red",
        fontWeight: "bold",
    },
};

export default ModalAddTransaction;
