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
exports.getStudentsWithProfessorsAndSubjectsSortByName = exports.getSubjectsWithFilteredStudents = exports.getAllProfessorsWithSubjectsAndStudentsCount = exports.getAllSubjectsWithProfessorsAndEnrolledStudents = exports.getAllStudentsWithProfessorsAndAdmissionRecord = exports.getAllProfessorsWithSubjectsAndStudents = exports.getSubjectsByStudentId = exports.getProfessorByStudentId = exports.getStudentsByProfessorId = exports.getSubjectsByProfessorId = exports.getAdmissionRecordById = exports.getAllAdmissionRecords = exports.getSubjectById = exports.getAllSubjects = exports.getStudentById = exports.getAllStudents = exports.getProfessorById = exports.getAllProfessors = void 0;
const prisma_1 = require("../configs/prisma");
const getAllProfessors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professors = yield prisma_1.prisma.professor.findMany();
        res.status(200).json({
            success: true,
            data: {
                professors: professors,
                total: professors.length,
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
exports.getAllProfessors = getAllProfessors;
const getProfessorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const professor = yield prisma_1.prisma.professor.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!professor) {
            return res.status(404).json({
                success: true,
                data: {
                    professor: professor,
                },
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                professor: professor,
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
exports.getProfessorById = getProfessorById;
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.prisma.student.findMany();
        return res.status(200).json({
            success: true,
            data: {
                students: students,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.json(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid id",
            });
        }
        const student = yield prisma_1.prisma.student.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            success: true,
            data: {
                student: student,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getStudentById = getStudentById;
const getAllSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield prisma_1.prisma.subject.findMany();
        return res.status(200).json({
            success: true,
            data: {
                subjects: subjects,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getAllSubjects = getAllSubjects;
const getSubjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const subject = yield prisma_1.prisma.subject.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({
            success: true,
            data: {
                subject: subject,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getSubjectById = getSubjectById;
const getAllAdmissionRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addmissionRecords = yield prisma_1.prisma.admissionRecord.findMany({
            include: {
                student: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: {
                addmissionRecords: addmissionRecords,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getAllAdmissionRecords = getAllAdmissionRecords;
const getAdmissionRecordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const admissionRecord = yield prisma_1.prisma.admissionRecord.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                student: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: {
                admissionRecord: admissionRecord,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getAdmissionRecordById = getAdmissionRecordById;
const getSubjectsByProfessorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const professorExist = yield prisma_1.prisma.professor.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!professorExist) {
            return res.status(404).json({
                success: false,
                error: "Professor not found",
            });
        }
        const subjects = yield prisma_1.prisma.subject.findMany({
            where: {
                professorId: Number(id)
            },
            include: {
                professor: true,
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                subjects: subjects,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getSubjectsByProfessorId = getSubjectsByProfessorId;
const getStudentsByProfessorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const professorExist = yield prisma_1.prisma.professor.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!professorExist) {
            return res.status(404).json({
                success: false,
                error: "Professor not found",
            });
        }
        const students = yield prisma_1.prisma.student.findMany({
            where: {
                professors: {
                    some: {
                        id: Number(id)
                    }
                }
            },
            include: {
                professors: true
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                students: students,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getStudentsByProfessorId = getStudentsByProfessorId;
const getProfessorByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const studentExist = yield prisma_1.prisma.student.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!studentExist) {
            return res.status(404).json({
                success: false,
                error: "Student not found",
            });
        }
        const professors = yield prisma_1.prisma.professor.findMany({
            where: {
                students: {
                    some: {
                        id: Number(id)
                    }
                }
            },
            include: {
                students: true
            }
        });
        res.status(200).json({
            success: true,
            data: {
                professors: professors,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getProfessorByStudentId = getProfessorByStudentId;
const getSubjectsByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const studentExist = yield prisma_1.prisma.student.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!studentExist) {
            return res.status(404).json({
                success: false,
                error: "Student not found",
            });
        }
        const subjects = yield prisma_1.prisma.subject.findMany({
            where: {
                students: {
                    some: {
                        id: Number(id)
                    }
                }
            },
            include: {
                students: true
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                subjects: subjects,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.getSubjectsByStudentId = getSubjectsByStudentId;
const getAllProfessorsWithSubjectsAndStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const professors = yield prisma_1.prisma.professor.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                subjects: true,
                students: true
            }
        });
        res.status(200).json({
            success: true,
            data: {
                professors: professors
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});
exports.getAllProfessorsWithSubjectsAndStudents = getAllProfessorsWithSubjectsAndStudents;
const getAllStudentsWithProfessorsAndAdmissionRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const students = yield prisma_1.prisma.student.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                professors: true,
                admissionRecord: true
            }
        });
        res.status(200).json({
            success: true,
            data: {
                students: students
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});
exports.getAllStudentsWithProfessorsAndAdmissionRecord = getAllStudentsWithProfessorsAndAdmissionRecord;
const getAllSubjectsWithProfessorsAndEnrolledStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const subjects = yield prisma_1.prisma.subject.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                professor: true,
                students: true
            }
        });
        res.status(200).json({
            success: true,
            data: {
                subjects: subjects
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});
exports.getAllSubjectsWithProfessorsAndEnrolledStudents = getAllSubjectsWithProfessorsAndEnrolledStudents;
const getAllProfessorsWithSubjectsAndStudentsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const professors = yield prisma_1.prisma.professor.findMany({
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                subjects: {
                    select: {
                        id: true,
                        title: true,
                        _count: {
                            select: { students: true }
                        }
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            data: {
                professors: professors
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.getAllProfessorsWithSubjectsAndStudentsCount = getAllProfessorsWithSubjectsAndStudentsCount;
const getSubjectsWithFilteredStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjectId = Number(req.params.id);
        const { name, professorId } = req.query;
        const students = yield prisma_1.prisma.student.findMany({
            where: {
                subjects: {
                    some: {
                        id: subjectId
                    }
                },
                AND: [
                    name ? { name: { contains: String(name), mode: 'insensitive' } } : {},
                    professorId ? { professors: { some: { id: Number(professorId) } } } : {}
                ]
            },
            select: {
                id: true,
                name: true,
                admissionRecord: {
                    select: {
                        fees: true
                    }
                },
                professors: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            data: {
                students: students
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.getSubjectsWithFilteredStudents = getSubjectsWithFilteredStudents;
const getStudentsWithProfessorsAndSubjectsSortByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.prisma.student.findMany({
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                name: true,
                subjects: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                professors: {
                    select: {
                        id: true,
                        name: true
                    }
                },
            },
        });
        res.status(200).json({
            success: true,
            data: {
                students: students
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});
exports.getStudentsWithProfessorsAndSubjectsSortByName = getStudentsWithProfessorsAndSubjectsSortByName;
