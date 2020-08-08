import { promises } from "fs";

const { readFile, writeFile } = promises;
let arrayCompleto = [];
let arrayMaiorNome = [];
let arrayMenorNome = [];

const gerarArquivos = async () => {
    const jsonEstados = await readFile("./arquivos_base/Estados.json");
    const jsonCidades = await readFile("./arquivos_base/Cidades.json");

    const arrayEstados = await JSON.parse(jsonEstados);
    const arrayCidades = await JSON.parse(jsonCidades);

    arrayEstados.forEach(({ ID, Sigla, Nome }) => {
        arrayCompleto.push({
            ID,
            Sigla,
            Nome,
            Cidades: arrayCidades.filter((item) => item.Estado === ID),
            QtdeCidades: arrayCidades.filter((item) => item.Estado === ID).length //prettier-ignore
        });
    });

    arrayCompleto.forEach(async (item) => {
        try {
            await writeFile(
                `./arquivos_gerados/${item.Sigla}.json`,
                JSON.stringify(item),
                "utf-8"
            );
        } catch (err) {
            console.log(err.message);
        }
    });

    console.log("Arquivos Gerados.");
};

const getQtdeCidade = async (sigla) => {
    const jsonCidade = await readFile(`./arquivos_gerados/${sigla}.json`);
    const arrayCidade = JSON.parse(jsonCidade);
    return arrayCidade.QtdeCidades;
};

const getMaisCidades = async () => {
    const arrayCidade = JSON.parse(JSON.stringify(arrayCompleto));
    arrayCidade.sort((a, b) => {
        if (a.QtdeCidades > b.QtdeCidades) {
            return -1;
        } else {
            return 1;
        }
    });

    const listaFinal = [];
    arrayCidade.forEach(({ Sigla, QtdeCidades }) => {
        if (listaFinal.length < 5)
            listaFinal.push(
                [Sigla, QtdeCidades].toString().replace(",", " - ")
            );
    });

    return listaFinal;
};

const getMenosCidades = async () => {
    const arrayCidade = JSON.parse(JSON.stringify(arrayCompleto));
    arrayCidade.sort((a, b) => {
        if (a.QtdeCidades > b.QtdeCidades) {
            return 1;
        } else {
            return -1;
        }
    });

    const listaTemp = [];
    arrayCidade.forEach(({ Sigla, QtdeCidades }) => {
        if (listaTemp.length < 5) listaTemp.push({ Sigla, QtdeCidades });
    });

    listaTemp.sort((a, b) => {
        if (a.QtdeCidades > b.QtdeCidades) {
            return -1;
        } else {
            return 1;
        }
    });

    const listaFinal = [];
    listaTemp.forEach(({ Sigla, QtdeCidades }) => {
        if (listaFinal.length < 5)
            listaFinal.push(
                [Sigla, QtdeCidades].toString().replace(",", " - ")
            );
    });

    return listaFinal;
};

const getMaioresNomesCidades = async () => {
    const arrayCidade = JSON.parse(JSON.stringify(arrayCompleto));

    arrayCidade.forEach((item) => {
        arrayMaiorNome.push([            
            item.Sigla,
            item.QtdeCidades === 1 ? item.Cidades[0].Nome :
            item.Cidades.reduce((acc, valorAtual) => {
                if (acc.length === undefined)
                    acc = "z";

                if (valorAtual.Nome.length > acc.length) return valorAtual.Nome;
                else if (valorAtual.Nome.length < acc.length) return acc;
                else{ 
                    const retorno = [valorAtual.Nome, acc].sort();
                    return retorno[0];
                }
            }),
        ].toString().replace(",", " - ")); //prettier-ignore
    });

    return arrayMaiorNome;
};

const getMenoresNomesCidades = async () => {
    const arrayCidade = JSON.parse(JSON.stringify(arrayCompleto));

    arrayCidade.forEach((item) => {
        arrayMenorNome.push([            
            item.Sigla,
            item.QtdeCidades === 1 ? item.Cidades[0].Nome :
            item.Cidades.reduce((acc, valorAtual) => {
                if (acc.length === undefined)
                    acc = "z"

                if (acc === "z" || valorAtual.Nome.length < acc.length) return valorAtual.Nome;
                else if (valorAtual.Nome.length > acc.length) return acc;
                else{ 
                    const retorno = [valorAtual.Nome, acc].sort();
                    return retorno[0];
                }
            }),
        ].toString().replace(",", " - ")); //prettier-ignore
    });

    return arrayMenorNome;
};

const getMaiorNomeCidade = async () => {
    const arrayMaiorNomeLocal = JSON.parse(JSON.stringify(arrayMaiorNome));

    arrayMaiorNomeLocal.sort((a, b) => {
        if (a.length > b.length) {
            return -1;
        } else if (a.length < b.length) {
            return 1;
        } else {
            const listaCidades = [
                `${a.substring(5)} - ${a.substring(0, 2)}`,
                `${b.substring(5)} - ${b.substring(0, 2)}`,
            ].sort();
            return listaCidades[0];
        }
    });

    return arrayMaiorNomeLocal[0];
};

const getMenorNomeCidade = async () => {
    const arrayMenorNomeLocal = JSON.parse(JSON.stringify(arrayMenorNome));
    arrayMenorNomeLocal.sort((a, b) => {
        if (a.length > b.length) {
            return 1;
        } else if (a.length < b.length) {
            return -1;
        } else {
            const listaCidades = [
                `${a.substring(5)} - ${a.substring(0, 2)}`,
                `${b.substring(5)} - ${b.substring(0, 2)}`,
            ].sort();
            return listaCidades[0].sub;
        }
    });

    return arrayMenorNomeLocal[0];
};

async function rodar() {
    await gerarArquivos();
    await console.log(await getQtdeCidade("RJ"));
    await console.log(await getMaisCidades());
    await console.log(await getMenosCidades());
    await console.log(await getMaioresNomesCidades());
    await console.log(await getMenoresNomesCidades());
    await console.log(await getMaiorNomeCidade());
    await console.log(await getMenorNomeCidade());
}

rodar();
