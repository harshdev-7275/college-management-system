import express,{Request, Response} from "express";
import { getAllProfessors, getProfessorById, getAllStudents, getStudentById, getAllSubjects, getSubjectById, getAllAdmissionRecords, getAdmissionRecordById, getSubjectsByProfessorId, getStudentsByProfessorId, getProfessorByStudentId, getSubjectsByStudentId } from "../controllers/userController";

const router= express.Router();

router.get("/get-all-professors", getAllProfessors)
router.get("/get-professor-by-id/:id", getProfessorById)



router.get("/get-all-students", getAllStudents)
router.get("/get-student-by-id/:id", getStudentById)


router.get("/get-all-subjects", getAllSubjects)
router.get("/get-subject-by-id/:id", getSubjectById)


router.get("/get-all-admission-records", getAllAdmissionRecords);
router.get("/get-admission-record-by-id/:id", getAdmissionRecordById);


router.get("/professor/:id/subjects", getSubjectsByProfessorId)

router.get("/professor/:id/students", getStudentsByProfessorId)


router.get("/students/:id/professors", getProfessorByStudentId)


router.get("/students/:id/subjects", getSubjectsByStudentId)





export default router;