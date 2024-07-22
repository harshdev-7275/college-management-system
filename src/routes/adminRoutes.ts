import express from "express"
import { addProfessor, addStudents, addSubjects, assignSubjectsToStudent, assignSubjectsToProfessor, assignStudentsToProfessor, deleteAllData } from "../controllers/adminController";


const router = express.Router();


router.post("/add-professor",addProfessor);

router.post("/add-students", addStudents);

router.post("/add-subjects", addSubjects );

router.patch("/assign-subject-to-student", assignSubjectsToStudent);

router.patch("/assign-subject-to-professor", assignSubjectsToProfessor);

router.patch ("/assign-students-to-professor", assignStudentsToProfessor);

router.delete("/delete-all", deleteAllData);


// router.post("/add-admission", addAdmissionRecord)





export default router