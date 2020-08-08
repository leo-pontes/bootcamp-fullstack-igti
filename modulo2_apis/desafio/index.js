import { promises } from "fs";
import express from "express";
import cors from "cors";
import winston from "winston";
import routerGrades from "./routes/grades.js";

const { readFile, writeFile } = promises;
const port = 3000;
const app = express();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(
    ({ level, message, label, timestamp }) =>
        `${timestamp} [${label}] ${level} ${message}`
);

app.use(cors());
app.use(express.json());
app.use("/grades", routerGrades);

global.arquivoJson = "grades.json";
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "grades.log" }),
    ],
    format: combine(
        label({label: "grades"}), 
        timestamp(), 
        myFormat
    ) //prettier-ignore
});

app.listen(port, async () => {
    try {
        await readFile(global.arquivoJson, "utf8");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            grades: [],
        };

        try {
            await writeFile(global.arquivoJson, JSON.stringify(initialJson));
        } catch {
            logger.error("Erro ao criar o arquivo Json.");
        }
    }
    logger.info("API Iniciada");
});
