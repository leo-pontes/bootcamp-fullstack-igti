import axios from "axios";

const API_URL = "http://localhost:3001/grade/";

const GRADE_VALIDATION = [
    {
        id: 1,
        gradeType: "Exercícios",
        minValue: 0,
        maxValue: 10,
    },
    {
        id: 2,
        gradeType: "Trabalho Prático",
        minValue: 0,
        maxValue: 40,
    },
    {
        id: 3,
        gradeType: "Desafio",
        minValue: 0,
        maxValue: 50,
    },
];

const getAllGrades = async () => {
    const res = await axios.get(API_URL);
    const grades = res.data.grades.map((grade) => {
        return {
            ...grade,
            studentLowerCase: grade.student.toLowerCase(),
            subjectLowerCase: grade.subject.toLowerCase(),
            typeLowerCase: grade.type.toLowerCase(),
            isDeleted: false,
        };
    });

    let allStudents = new Set();
    let allSubjects = new Set();
    let allGradeTypes = new Set();

    grades.forEach((element) => {
        allStudents.add(element.student);
        allSubjects.add(element.subject);
        allGradeTypes.add(element.type);
    });

    allStudents = Array.from(allStudents);
    allSubjects = Array.from(allSubjects);
    allGradeTypes = Array.from(allGradeTypes);

    let maxId = -1;
    grades.forEach(({ id }) => {
        if (id > maxId) {
            maxId = id;
        }
    });
    let nextId = maxId + 1;

    const allCombinations = [];
    allStudents.forEach((student) => {
        allSubjects.forEach((subject) => {
            allGradeTypes.forEach((type) => {
                allCombinations.push({
                    student,
                    subject,
                    type,
                });
            });
        });
    });

    allCombinations.forEach(({ student, subject, type }) => {
        const hasItem = grades.find((grade) => {
            return (
                grade.subject === subject &&
                grade.student === student &&
                grade.type === type
            );
        });

        if (!hasItem) {
            grades.push({
                id: nextId++,
                student,
                studentLowerCase: student.toLowerCase(),
                subject,
                subjectLowerCase: subject.toLowerCase(),
                type,
                typeLowerCase: type.toLowerCase(),
                value: 0,
                isDeleted: true,
            });
        }
    });

    grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
    grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
    grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

    return grades;
};

const insertGrade = async (grade) => {
    const response = await axios.post(API_URL, grade);
    return response.data.id;
};

const updateGrade = async (grade) => {
    const response = await axios.put(API_URL, grade);
    return response.data;
};

const deleteGrade = async (grade) => {
    const response = await axios.delete(`${API_URL}/${grade.id}`);
    return response.data;
};

const getvalidationFromGradeType = async (gradeType) => {
    const gradeValidation = GRADE_VALIDATION.find(
        (item) => item.gradeType === gradeType
    );

    return {
        minValue: gradeValidation.minValue,
        maxValue: gradeValidation.maxValue,
    };
};

export {
    getAllGrades,
    insertGrade,
    updateGrade,
    deleteGrade,
    getvalidationFromGradeType,
};