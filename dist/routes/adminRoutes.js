"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.post("/add-professor", adminController_1.addProfessor);
router.post("/add-students", adminController_1.addStudents);
router.post("/add-subjects", adminController_1.addSubjects);
router.patch("/assign-subject-to-student", adminController_1.assignSubjectsToStudent);
router.patch("/assign-subject-to-professor", adminController_1.assignSubjectsToProfessor);
router.patch("/assign-students-to-professor", adminController_1.assignStudentsToProfessor);
router.delete("/delete-all", adminController_1.deleteAllData);
// router.post("/add-admission", addAdmissionRecord)
exports.default = router;
