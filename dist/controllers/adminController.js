"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllData = exports.assignStudentsToProfessor = exports.assignSubjectsToProfessor = exports.assignSubjectsToStudent = exports.addSubjects = exports.addStudents = exports.addProfessor = void 0;
const prisma_1 = require("../configs/prisma");
const addProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const newProfessor = yield prisma_1.prisma.professor.create({
            data: { title },
        });
        res.status(201).json({
            success: true,
            data: {
                message: "Professor added successfully",
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: {
                error: "Internal server error",
            },
        });
    }
});
exports.addProfessor = addProfessor;
const addStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, fees } = req.body;
        if (!name || !fees) {
            return res.status(400).json({
                success: false,
                error: "Please provide name and fees",
            });
        }
        const existingStudent = yield prisma_1.prisma.student.findFirst({
            where: {
                name: name,
            },
        });
        if (existingStudent) {
            return res.status(409).json({ error: "Student already exists." });
        }
        const newAdmissionRecord = yield prisma_1.prisma.admissionRecord.create({
            data: {
                fees,
            },
        });
        const newStudent = yield prisma_1.prisma.student.create({
            data: {
                name,
                admissionRecord: {
                    connect: {
                        id: newAdmissionRecord.id,
                    },
                },
            },
            include: {
                admissionRecord: true,
            },
        });
        res.status(201).json({
            success: true,
            data: {
                message: "Student added successfully",
                student: newStudent,
            },
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while adding the student." });
    }
});
exports.addStudents = addStudents;
const addSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const existingSubject = yield prisma_1.prisma.subject.findFirst({
            where: {
                title,
            },
        });
        if (existingSubject) {
            return res.status(409).json({
                success: false,
                error: "Subject already exists",
            });
        }
        const newSubject = yield prisma_1.prisma.subject.create({
            data: {
                title,
            },
        });
        res.status(201).json({
            success: true,
            message: "Subject added successfully",
            data: {
                subject: newSubject,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.addSubjects = addSubjects;
const assignSubjectsToStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subjectId } = req.query;
        if (!studentId || !subjectId) {
            return res.status(400).json({
                success: false,
                error: "Please provide studentId and subjectId",
            });
        }
        const existingStudent = yield prisma_1.prisma.student.findFirst({
            where: {
                id: Number(studentId),
            },
        });
        const existingSubject = yield prisma_1.prisma.subject.findFirst({
            where: {
                id: Number(subjectId),
            },
        });
        if (!existingStudent || !existingSubject) {
            return res.status(404).json({
                success: false,
                error: "Student or subject not found",
            });
        }
        const assignToStudent = yield prisma_1.prisma.student.update({
            where: {
                id: Number(studentId),
            },
            data: {
                subjects: {
                    connect: {
                        id: Number(subjectId),
                    },
                },
            },
        });
        const assignToSubject = yield prisma_1.prisma.subject.update({
            where: {
                id: Number(subjectId),
            },
            data: {
                students: {
                    connect: {
                        id: Number(studentId),
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: "Student and subject assigned successfully",
            data: {
                student: assignToStudent,
                subject: assignToSubject,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.assignSubjectsToStudent = assignSubjectsToStudent;
const assignSubjectsToProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId, subjectId } = req.query;
        if (!professorId || !subjectId) {
            return res.status(400).json({
                success: false,
                error: "Please provide professorId and subjectId",
            });
        }
        const existingProfessor = yield prisma_1.prisma.professor.findFirst({
            where: {
                id: Number(professorId),
            },
        });
        const existingSubject = yield prisma_1.prisma.subject.findFirst({
            where: {
                id: Number(subjectId),
            },
        });
        if (!existingProfessor || !existingSubject) {
            return res.status(404).json({
                success: false,
                error: "Professor or subject not found",
            });
        }
        const assignToProfessor = yield prisma_1.prisma.professor.update({
            where: {
                id: Number(professorId),
            },
            data: {
                subjects: {
                    connect: {
                        id: Number(subjectId),
                    },
                },
            },
        });
        const assignToSubject = yield prisma_1.prisma.subject.update({
            where: {
                id: Number(subjectId),
            },
            data: {
                professor: {
                    connect: {
                        id: Number(professorId),
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: "Student and subject assigned successfully",
            data: {
                professor: assignToProfessor,
                subject: assignToSubject
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.assignSubjectsToProfessor = assignSubjectsToProfessor;
const assignStudentsToProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId, studentId } = req.query;
        if (!professorId || !studentId) {
            return res.status(400).json({
                success: false,
                error: "Please provide professorId and studentId",
            });
        }
        const existingProfessor = yield prisma_1.prisma.professor.findFirst({
            where: {
                id: Number(professorId),
            },
        });
        const existingStudent = yield prisma_1.prisma.student.findFirst({
            where: {
                id: Number(studentId),
            },
        });
        if (!existingProfessor || !existingStudent) {
            return res.status(404).json({
                success: false,
                error: "Professor or student not found",
            });
        }
        const assignStudentToProfessor = yield prisma_1.prisma.student.update({
            where: {
                id: Number(studentId)
            },
            data: {
                professors: {
                    connect: {
                        id: Number(professorId)
                    }
                }
            }
        });
        const assignProfessorToStudent = yield prisma_1.prisma.professor.update({
            where: {
                id: Number(professorId)
            },
            data: {
                students: {
                    connect: {
                        id: Number(studentId)
                    }
                }
            }
        });
        res.status(201).json({
            success: true,
            message: "Student and professor assigned successfully",
            data: {
                student: assignStudentToProfessor,
                professor: assignProfessorToStudent
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.assignStudentsToProfessor = assignStudentsToProfessor;
const deleteAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.student.deleteMany();
        yield prisma_1.prisma.subject.deleteMany();
        yield prisma_1.prisma.professor.deleteMany();
        res.status(200).json({
            success: true,
            message: "All data deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.deleteAllData = deleteAllData;
