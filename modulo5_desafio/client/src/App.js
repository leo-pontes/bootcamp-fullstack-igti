import React, { useState, useEffect } from "react";
import FiltroMes from "./components/FiltroMes";
import ListaTransacao from "./components/ListaTransacao";
import * as api from "./api/apiService";
import Resumo from "./components/Resumo";
import FiltroTransacao from "./components/FiltroTransacao";
import ModalAddTransaction from "./components/ModalAddTransaction";

export default function App() {
    const [mesAno, setMesAno] = useState("2020-07");
    const [transacoes, setTransacoes] = useState([]);
    const [transacoesEstaticas, setTransacoesEstaticas] = useState([]);
    const [countLancamento, setCountLancamento] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [despesas, setDespesas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({
        description: "",
        value: "",
        category: "",
        yearMonthDay: "",
        type: "+",
    });

    useEffect(() => {
        api.getAllByMesAno(mesAno).then((result) => {
            setTransacoes(Array.from(result));
            setTransacoesEstaticas(Array.from(result));
        });
    }, [mesAno]);

    useEffect(() => {
        setCountLancamento(transacoes.length);

        const listaReceita = transacoes.filter((obj) => obj.type === "+");

        const listaDespesas = transacoes.filter((obj) => obj.type === "-");

        const somaReceita = listaReceita.reduce(
            (acc, curr) => acc + curr.value,
            0
        );

        const somaDespesa = listaDespesas.reduce(
            (acc, curr) => acc + curr.value,
            0
        );

        setReceitas(somaReceita);
        setDespesas(somaDespesa);
        setSaldo(somaReceita - somaDespesa);
    }, [transacoes]);

    const handleTrocaMes = (newMes) => {
        setMesAno(newMes);
    };

    const handleFiltraTransacao = (valor) => {
        const listaFiltrada = transacoesEstaticas.filter((obj) =>
            obj.description.toLowerCase().includes(valor.toLowerCase())
        );

        setTransacoes(listaFiltrada);
    };

    const handleAdicionar = (obj) => {
        setSelectedTransaction({
            description: "",
            value: "",
            category: "",
            yearMonthDay: "",
            type: "+",
        });
        if (obj !== undefined) setSelectedTransaction(obj);
        setisModalOpen(true);
    };

    const handleSave = async (obj) => {
        try {
            if (obj._id === undefined) {
                await api.insertTransaction(obj);
            } else {
                await api.updateTransaction(obj);
            }

            handleClose();

            const atualiza = mesAno;
            setMesAno("2000-01");
            setMesAno(atualiza);
        } catch (err) {}
    };

    const handleDelete = async (obj) => {
        try {
            await api.deleteTransaction(obj);

            const atualiza = mesAno;
            setMesAno("2000-01");
            setMesAno(atualiza);
        } catch (err) {}
    };

    const handleClose = () => {
        setisModalOpen(false);
    };

    return (
        <>
            <div style={styles.flexRow}>
                <h3>
                    <strong> Desafio Final do Bootcamp Full Stack</strong>
                </h3>

                <h5>Controle Financeiro Pessoal</h5>

                {!isModalOpen && (
                    <>
                        <FiltroMes
                            mesInicial={mesAno}
                            retornoEscolha={handleTrocaMes}
                        />

                        <Resumo
                            qtde={countLancamento}
                            receita={receitas}
                            despesa={despesas}
                            saldo={saldo}
                        ></Resumo>

                        <FiltroTransacao
                            handleFiltraTransacao={handleFiltraTransacao}
                            handleAdicionar={handleAdicionar}
                        />
                    </>
                )}

                <ListaTransacao
                    listaTrans={transacoes}
                    handleEditar={handleAdicionar}
                    handleDelete={handleDelete}
                />
            </div>
            <div>
                {isModalOpen && (
                    <ModalAddTransaction
                        onSave={handleSave}
                        onClose={handleClose}
                        selectedTransaction={selectedTransaction}
                    />
                )}
            </div>
        </>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
};
