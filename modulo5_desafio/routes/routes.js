const express = require("express");
const transactionRouter = express.Router();
const transactionModel = require("../models/TransactionModel.js");

transactionRouter.get("/", async (req, res) => {
    try {
        const transaction = await transactionModel.find({});
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.get("/:anoMes", async (req, res) => {
    try {
        const transaction = await transactionModel.find({
            yearMonth: req.params.anoMes,
        });
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.post("/", async (req, res) => {
    try {
        const transaction = new transactionModel(req.body);
        await transaction.save();

        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.delete("/:id", async (req, res) => {
    try {
        const transaction = await transactionModel.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.put("/:id", async (req, res) => {
    try {
        const transaction = await transactionModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            req.body,
            { new: true }
        );

        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = transactionRouter;
