import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Painel from "./components/painel/Painel";

export default function App() {
    const [valorInicial, setValorInicial] = useState(0);
    const [taxaJurosMensal, setTaxaJurosMensal] = useState(0);
    const [periodoMeses, setPeriodoMeses] = useState(1);
    const [parcelas, setParcelas] = useState([]);

    useEffect(() => {
        if (valorInicial !== 0 && taxaJurosMensal !== 0 && periodoMeses !== 0)
            calculateInterest(valorInicial, taxaJurosMensal, periodoMeses);
    }, [valorInicial, taxaJurosMensal, periodoMeses]);

    const handleHeaderChange = (idComponente, newValue) => {
        if (idComponente === "inputValorInicial")
            setValorInicial(parseFloat(newValue));
        if (idComponente === "inputTaxaJuros")
            setTaxaJurosMensal(parseFloat(newValue));
        if (idComponente === "inputPeriodo")
            setPeriodoMeses(parseFloat(newValue));
    };

    const calculateInterest = (
        initialValue,
        monthlyInterest,
        monthlyPeriod
    ) => {
        const newInstallments = [];

        let currentId = 1;
        let currentValue = initialValue;
        let percentage = 0;

        for (let i = 1; i <= monthlyPeriod; i++) {
            const percentValue =
                (currentValue * Math.abs(monthlyInterest)) / 100;

            currentValue =
                monthlyInterest >= 0
                    ? currentValue + percentValue
                    : currentValue - percentValue;

            percentage = (currentValue / initialValue - 1) * 100;

            newInstallments.push({
                id: currentId++,
                value: currentValue,
                difference: currentValue - initialValue,
                percentage,
                profit: monthlyInterest > 0,
            });
        }

        setParcelas(newInstallments);
    };

    return (
        <>
            <div className="center">
                <h1>Desafio React</h1>
                <Header
                    valorInicial={valorInicial}
                    taxaJurosMensal={taxaJurosMensal}
                    periodoMeses={periodoMeses}
                    onChange={handleHeaderChange}
                />

                <Painel parcelas={parcelas} />
            </div>
        </>
    );
}
