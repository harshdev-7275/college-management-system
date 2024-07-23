import express from "express";
import {
  addProfessor,
  addStudents,
  addSubjects,
  assignSubjectsToStudent,
  assignSubjectsToProfessor,
  assignStudentsToProfessor,
  deleteAllData,
} from "../controllers/adminController";

const router = express.Router();

/**
 * @swagger
 * /add-professor:
 *   post:
 *     summary: Add a new professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Professor added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/add-professor", addProfessor);

/**
 * @swagger
 * /add-students:
 *   post:
 *     summary: Add new students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               fees:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Student added successfully
 *       400:
 *         description: Please provide name and fees
 *       409:
 *         description: Student already exists
 *       500:
 *         description: Internal server error
 */
router.post("/add-students", addStudents);

/**
 * @swagger
 * /add-subjects:
 *   post:
 *     summary: Add new subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mathematics
 *     responses:
 *       201:
 *         description: Subject added successfully
 *       409:
 *         description: Subject already exists
 *       500:
 *         description: Internal server error
 */
router.post("/add-subjects", addSubjects);

/**
 * @swagger
 * /assign-subject-to-student:
 *   patch:
 *     summary: Assign a subject to a student
 *     parameters:
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the student
 *       - in: query
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subject
 *     responses:
 *       201:
 *         description: Student and subject assigned successfully
 *       400:
 *         description: Please provide studentId and subjectId
 *       404:
 *         description: Student or subject not found
 *       500:
 *         description: Internal server error
 */
router.patch("/assign-subject-to-student", assignSubjectsToStudent);

/**
 * @swagger
 * /assign-subject-to-professor:
 *   patch:
 *     summary: Assign a subject to a professor
 *     parameters:
 *       - in: query
 *         name: professorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the professor
 *       - in: query
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subject
 *     responses:
 *       201:
 *         description: Professor and subject assigned successfully
 *       400:
 *         description: Please provide professorId and subjectId
 *       404:
 *         description: Professor or subject not found
 *       500:
 *         description: Internal server error
 */
router.patch("/assign-subject-to-professor", assignSubjectsToProfessor);

/**
 * @swagger
 * /assign-students-to-professor:
 *   patch:
 *     summary: Assign students to a professor
 *     parameters:
 *       - in: query
 *         name: professorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the professor
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the student
 *     responses:
 *       201:
 *         description: Student and professor assigned successfully
 *       400:
 *         description: Please provide professorId and studentId
 *       404:
 *         description: Professor or student not found
 *       500:
 *         description: Internal server error
 */
router.patch("/assign-students-to-professor", assignStudentsToProfessor);

/**
 * @swagger
 * /delete-all:
 *   delete:
 *     summary: Delete all data
 *     responses:
 *       200:
 *         description: All data deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/delete-all", deleteAllData);

export default router;
