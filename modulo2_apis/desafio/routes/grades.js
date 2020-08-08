import { promises } from "fs";
import express from "express";

const { readFile, writeFile } = promises;

const routerGrades = express.Router();

routerGrades.post("/", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);
        const grade = {
            id: json.nextId++,
            ...req.body,
            timestamp: new Date().toString() //prettier-ignore
        };

        json.grades.push(grade);

        await writeFile(global.arquivoJson, JSON.stringify(json));

        res.send(grade);
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.put("/", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        let json = JSON.parse(data);

        let idx2 = json.grades.findIndex((acc) => acc.id === req.body.id);
        if (idx2 === -1) throw new Error("Id não cadastrado.");

        json.grades[Idx2];

        json.grades[Idx] = {
            ...req.body,
            timestamp: json.grades[Idx].timestamp //prettier-ignore
        };

        await writeFile(global.arquivoJson, JSON.stringify(json));

        res.end({
            Erro: "Grade atualizada com sucesso.",
        });
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.delete("/:id", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);

        json.grades = json.grades.find(
            (acc) => acc.id !== parseInt(req.params.id, 10)
        );

        await writeFile(global.arquivoJson, JSON.stringify(json));

        res.end({
            Erro: "Grade excluída com sucesso.",
        });
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.get("/:id", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);

        const item = json.grades.find(
            (acc) => acc.id === parseInt(req.params.id, 10)
        );

        res.send(JSON.stringify(item));
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.post("/getSomatorioNotas", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);

        const items = json.grades.filter((item) => {
            return (
                item.student === req.body.student &&
                item.subject === req.body.subject
            );
        });

        let soma = items.map((curr) => curr.value);
        soma = [...soma].reduce((acc, curr) => acc + curr);

        res.send({ totalNotas: soma });
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.post("/getMediaNotas", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);

        const items = json.grades.filter((item) => {
            return (
                item.type === req.body.type && item.subject === req.body.subject
            );
        });

        let soma = items.map((curr) => curr.value);
        soma = [...soma].reduce((acc, curr) => acc + curr);

        const media = soma / items.length;

        res.send({ media });
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

routerGrades.post("/getMelhoresNotas", async (req, res) => {
    try {
        const data = await readFile(global.arquivoJson, "utf8");
        const json = JSON.parse(data);

        const items = json.grades.filter((item) => {
            return (
                item.type === req.body.type && item.subject === req.body.subject
            );
        });

        items.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            } else {
                return 1;
            }
        });

        const listaFinal = items.map((item, idx) => {
            if (idx < 3) return item;
            else return;
        });

        res.send(listaFinal);
    } catch (err) {
        res.status(500).send({
            Erro: `Erro do servidor: ${err.message}`,
        });
    }
});

export default routerGrades;
