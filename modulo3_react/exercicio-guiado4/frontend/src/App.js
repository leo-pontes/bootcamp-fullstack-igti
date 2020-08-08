import React, { useState, useEffect } from "react";
import * as api from "./api/apiService";
import Spinner from "./components/Spinner";
import GradesControl from "./components/GradesControl";
import ModalGrade from "./components/ModalGrade";

export default function App() {
    const [allGrades, setAllGrades] = useState([]);
    const [selectedGrade, setselectedGrade] = useState({});
    const [isModalOpen, setisModalOpen] = useState(false);

    useEffect(() => {
        const getGrades = async () => {
            const grades = await api.getAllGrades();
            setAllGrades(grades);
        };

        getGrades();
    }, []);

    const handleDelete = async (grade) => {
        const isDeleted = await api.deleteGrade(grade);
        if (isDeleted) {
            const deletedGradeIndex = allGrades.findIndex(
                (item) => item.id === grade.id
            );

            const newGrades = Object.assign([], allGrades);
            newGrades[deletedGradeIndex].isDeleted = true;
            newGrades[deletedGradeIndex].value = 0;

            setAllGrades(newGrades);
        }
    };

    const handlePersist = (grade) => {
        setselectedGrade(grade);
        setisModalOpen(true);
    };

    const handlePersistData = async ({ id, newValue }) => {
        const newGrades = Object.assign([], allGrades);
        const gradeToPersist = newGrades.find((grade) => grade.id === id);
        gradeToPersist.value = newValue;

        if (gradeToPersist.isDeleted) {
            gradeToPersist.isDeleted = false;
            await api.insertGrade(gradeToPersist);
        } else await api.updateGrade(gradeToPersist);

        setisModalOpen(false);
    };

    const handleClose = (grade) => {
        setisModalOpen(false);
    };

    return (
        <div className="center">
            <h1>Controle de Notas</h1>
            {allGrades.length === 0 && <Spinner />}
            {allGrades.length > 0 && (
                <GradesControl
                    grades={allGrades}
                    onDelete={handleDelete}
                    onPersist={handlePersist}
                />
            )}

            {isModalOpen && (
                <ModalGrade
                    onSave={handlePersistData}
                    onClose={handleClose}
                    selectedGrade={selectedGrade}
                />
            )}
        </div>
    );
}
