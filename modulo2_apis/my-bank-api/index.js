let fs = require("fs").promises;
let express = require("express");
let accountsRouter = require("./routes/accounts.js");
let winston = require("winston");
let cors = require("cors");

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(
    ({ level, message, label, timestamp }) =>
        `${timestamp} [${label}] ${level} ${message}`
);

let port = 3000;
let app = express();

global.arquivoJson = "accounts.json";
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "my-bank-api.log" }),
    ],
    format: combine(
        label({label: "my-bank-api"}), 
        timestamp(), 
        myFormat
    ) //prettier-ignore
});

app.use(cors());
app.use(express.json());
app.use("/account", accountsRouter);

app.listen(port, async () => {
    try {
        await fs.readFile(global.arquivoJson, "utf8");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };

        try {
            await fs.writeFile(global.arquivoJson, JSON.stringify(initialJson));
        } catch {
            logger.error("Erro ao criar o arquivo Json.");
        }
    }
    logger.info("API Iniciada");
});
