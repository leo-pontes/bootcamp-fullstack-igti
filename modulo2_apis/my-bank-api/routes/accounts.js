let fs = require("fs");
let fs2 = require("fs").promises;
let express = require("express");

let router = express.Router();

router.post("/", (req, res) => {
    let account = req.body;
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);
                account = { id: json.nextId++, ...account };
                json.accounts.push(account);

                fs.writeFile(
                    global.arquivoJson,
                    JSON.stringify(json),
                    (err) => {
                        if (err) {
                            res.status(500).send({
                                Erro: "Falha na escrita do arquivo json.",
                            });
                        } else {
                            res.end();
                        }
                    }
                );
            } catch (err2) {
                res.status(500).send({
                    Erro: `Falha na leitura do arquivo json: ${err2.message}`,
                });
            }
        } else {
            res.status(500).send({ Erro: err.message });
        }
    });
});

router.post("/new", async (req, res) => {
    let account = req.body;
    try {
        data = await fs2.readFile(arquivoJson, "utf8");

        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        await fs2.writeFile(global.arquivoJson, JSON.stringify(json));
        res.end();
    } catch (err) {
        res.status(500).send({
            Erro: `Falha na leitura do arquivo json: ${err2.message}`,
        });
    }
});

router.get("/", (_, res) => {
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({
                Erro: `Falha na leitura do arquivo json: ${err2.message}`,
            });
        } else {
            let response = JSON.parse(data);
            delete response.nextId;
            res.send(response);
        }
    });
});

router.get("/:id", (req, res) => {
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({
                Erro: `Falha na leitura do arquivo json: ${err2.message}`,
            });
        } else {
            let bd = JSON.parse(data);
            const response = bd.accounts.find(
                (acc) => acc.id === parseInt(req.params.id, 10)
            );
            res.send(response);
        }
    });
});

router.delete("/:id", (req, res) => {
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({
                Erro: `Falha na leitura do arquivo json: ${err2.message}`,
            });
        } else {
            let bd = JSON.parse(data);
            const response = bd.accounts.filter(
                (acc) => acc.id !== parseInt(req.params.id, 10)
            );

            bd.accounts = response;

            fs.writeFile(global.arquivoJson, JSON.stringify(bd), (err) => {
                if (err) {
                    res.status(500).send({
                        Erro: "Falha na escrita do arquivo json.",
                    });
                } else {
                    res.end();
                }
            });
        }
    });
});

router.put("/", (req, res) => {
    let account = req.body;
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({
                Erro: `Falha na leitura do arquivo json: ${err2.message}`,
            });
        } else {
            let bd = JSON.parse(data);
            const oldIdx = bd.accounts.findIndex(
                (acc) => acc.id === account.id
            );
            bd.accounts[oldIdx] = account;

            fs.writeFile(global.arquivoJson, JSON.stringify(bd), (err) => {
                if (err) {
                    res.status(500).send({
                        Erro: "Falha na escrita do arquivo json.",
                    });
                } else {
                    res.end();
                }
            });
        }
    });
});

router.post("/transaction", (req, res) => {
    let params = req.body;
    fs.readFile(arquivoJson, "utf8", (err, data) => {
        if (err) {
            res.status(500).send({
                Erro: `Falha na leitura do arquivo json: ${err2.message}`,
            });
        } else {
            let bd = JSON.parse(data);
            const Idx = bd.accounts.findIndex((acc) => acc.id === params.id);
            bd.accounts[Idx].balance += params.value;

            if (bd.accounts[Idx].balance < 0) {
                res.status(500).send({
                    Erro: "Saldo insuficiente.",
                });
            }

            fs.writeFile(global.arquivoJson, JSON.stringify(bd), (err) => {
                if (err) {
                    res.status(500).send({
                        Erro: "Falha na escrita do arquivo json.",
                    });
                } else {
                    res.send({ novoSaldo: bd.accounts[Idx].balance });
                }
            });
        }
    });
});

module.exports = router;
