import axios from "axios";

const API_URL = "/api/transaction";

const getAllByMesAno = async (mesAno) => {
    const res = await axios.get(`${API_URL}/${mesAno}`);
    return res.data;
};

const insertTransaction = async (transaction) => {
    const response = await axios.post(API_URL, transaction);
    return response.data.id;
};

const updateTransaction = async (transaction) => {
    const response = await axios.put(
        `${API_URL}/${transaction._id}`,
        transaction
    );
    return response.data;
};

const deleteTransaction = async (transaction) => {
    const response = await axios.delete(`${API_URL}/${transaction._id}`);
    return response.data;
};

export {
    getAllByMesAno,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
};
