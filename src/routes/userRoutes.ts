import express,{Request, Response} from "express";
import { getAllProfessors, getProfessorById, getAllStudents, getStudentById, getAllSubjects, getSubjectById, getAllAdmissionRecords, getAdmissionRecordById, getSubjectsByProfessorId, getStudentsByProfessorId, getProfessorByStudentId, getSubjectsByStudentId, getAllProfessorsWithSubjectsAndStudents, getAllStudentsWithProfessorsAndAdmissionRecord, getAllSubjectsWithProfessorsAndEnrolledStudents, getAllProfessorsWithSubjectsAndStudentsCount, getSubjectsWithFilteredStudents, getStudentsWithProfessorsAndSubjectsSortByName } from "../controllers/userController";

const router= express.Router();



/**
 * @swagger
 * /get-all-professors:
 *   get:
 *     summary: Get all professors
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/get-all-professors", getAllProfessors)


/**
 * @swagger
 * /get-professor-by-id/{id}:
 *   get:
 *     summary: Get professor by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Professor not found
 */
router.get("/get-professor-by-id/:id", getProfessorById)


/**
 * @swagger
 * /get-all-students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/get-all-students", getAllStudents)





/**
 * @swagger
 * /get-student-by-id/{id}:
 *   get:
 *     summary: Get student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Student not found
 */
router.get("/get-student-by-id/:id", getStudentById)

/**
 * @swagger
 * /get-all-subjects:
 *   get:
 *     summary: Get all subjects
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/get-all-subjects", getAllSubjects)



/**
 * @swagger
 * /get-subject-by-id/{id}:
 *   get:
 *     summary: Get subject by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Subject not found
 */
router.get("/get-subject-by-id/:id", getSubjectById)



/**
 * @swagger
 * /get-all-admission-records:
 *   get:
 *     summary: Get all admission records
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/get-all-admission-records", getAllAdmissionRecords);



/**
 * @swagger
 * /get-admission-record-by-id/{id}:
 *   get:
 *     summary: Get admission record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Admission record not found
 */

router.get("/get-admission-record-by-id/:id", getAdmissionRecordById);


/**
 * @swagger
 * /professor/{id}/students:
 *   get:
 *     summary: Get students by professor ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Professor not found
 */
router.get("/professor/:id/students", getStudentsByProfessorId)


/**
 * @swagger
 * /students/{id}/professors:
 *   get:
 *     summary: Get professors by student ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Student not found
 */
router.get("/students/:id/professors", getProfessorByStudentId)


/**
 * @swagger
 * /students/{id}/subjects:
 *   get:
 *     summary:  Fetches a list of subjects a specific student is enrolled in.
 *     parameters:
 *       - in: path
 *         name: id (student ID)
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Student not found
 */
router.get("/students/:id/subjects", getSubjectsByStudentId)



// Get Professors with Their Subjects and Students

/**
 * @swagger
 * /professors/details:
 *   get:
 *     summary: Fetches a list of all professors along with their subjects and the students they mentor.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get("/professors/details", getAllProfessorsWithSubjectsAndStudents)

// Get Students with Their Professors and Admission Record

/**
 * @swagger
 * /students/details:
 *   get:
 *     summary: Fetches a list of all students along with their associated professors and admission record.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get("/students/details", getAllStudentsWithProfessorsAndAdmissionRecord)

//Get Subjects with Their Professors and Enrolled Students

/**
 * @swagger
 * /subjects/details:
 *   get:
 *     summary: Fetches a list of all subjects along with their professors and the students enrolled in each subject.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get("/subjects/details", getAllSubjectsWithProfessorsAndEnrolledStudents)

//Get Professors and Their Subjects with Student Count

/**
 * @swagger
 * /professors/subjects-student-count:
 *   get:
 *     summary: Fetches a list of professors, their subjects, and the count of students enrolled in each subject.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/professors/subjects-student-count", getAllProfessorsWithSubjectsAndStudentsCount)

//Get Subjects with Filtered Students
/**
 * @swagger
 * /subjects/{id}/students:
 *   get:
 *     summary: Fetches a list of students enrolled in a specific subject, with optional filters for student attributes.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: professorId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/subjects/:id/students", getSubjectsWithFilteredStudents)

// Get Students with Their Professors and Subjects, Sorted by Name
/**
 * @swagger
 * /students/complete-details:
 *   get:
 *     summary: Get students sorted by name with their professors and subjects
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/students/complete-details", getStudentsWithProfessorsAndSubjectsSortByName)







export default router;