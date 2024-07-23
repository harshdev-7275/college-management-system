import { Request, Response } from "express";
import { prisma } from "../configs/prisma";
const addProfessor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newProfessor = await prisma.professor.create({
      data:{
        name
      }
    });
    res.status(201).json({
      success: true,
      message: "Professor added successfully",
      data: {
        professor: newProfessor,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: {
        error: "Internal server error",
      },
    });
  }
};

const addStudents = async (req: Request, res: Response) => {
  try {
    const { name, fees } = req.body;
    if (!name || !fees) {
      return res.status(400).json({
        success: false,
        error: "Please provide name and fees",
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        name: name,
      },
    });

    if (existingStudent) {
      return res.status(409).json({ error: "Student already exists." });
    }

    const newAdmissionRecord = await prisma.admissionRecord.create({
      data: {
        fees,
      },
    });

    const newStudent = await prisma.student.create({
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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the student." });
  }
};

const addSubjects = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const existingSubject = await prisma.subject.findFirst({
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
    const newSubject = await prisma.subject.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const assignSubjectsToStudent = async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId } = req.query;
    if (!studentId || !subjectId) {
      return res.status(400).json({
        success: false,
        error: "Please provide studentId and subjectId",
      });
    }
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: Number(studentId),
      },
    });

    const existingSubject = await prisma.subject.findFirst({
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
    const assignToStudent = await prisma.student.update({
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
    const assignToSubject = await prisma.subject.update({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const assignSubjectsToProfessor = async (req: Request, res: Response) => {
  try {
    const { professorId, subjectId } = req.query;
    if (!professorId || !subjectId) {
      return res.status(400).json({
        success: false,
        error: "Please provide professorId and subjectId",
      });
    }
    const existingProfessor = await prisma.professor.findFirst({
      where: {
        id: Number(professorId),
      },
    });
    const existingSubject = await prisma.subject.findFirst({
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
    const assignToProfessor = await prisma.professor.update({
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
    const assignToSubject = await prisma.subject.update({
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
        success:true,
        message:"Student and subject assigned successfully",
        data:{
            professor:assignToProfessor,
            subject:assignToSubject
        }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
const assignStudentsToProfessor = async (req: Request, res: Response) => {
  
    try {

      
        const { professorId, studentId } = req.query;
        if (!professorId || !studentId) {
            return res.status(400).json({
                success: false,
                error: "Please provide professorId and studentId",
            });
        }
        const existingProfessor = await prisma.professor.findFirst({
            where: {
                id: Number(professorId),
            },
        });
        const existingStudent = await prisma.student.findFirst({
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
       const assignStudentToProfessor = await prisma.student.update({
        where: {
            id :Number(studentId)
        }, 
        data:{
            professors:{
                connect:{
                    id:Number(professorId)
                }
            }
        }
       })
       const assignProfessorToStudent = await prisma.professor.update({
           where:{
            id:Number(professorId)
           },
           data:{
            students:{
                connect:{
                    id:Number(studentId)
                }
            }
           }
       })

       res.status(201).json({
           success:true,
           message:"Student and professor assigned successfully",
           data:{
               student:assignStudentToProfessor,
               professor:assignProfessorToStudent
           }
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}
const deleteAllData = async (req: Request, res: Response) => {
  try {
    await prisma.student.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.professor.deleteMany();
    res.status(200).json({
      success: true,
      message: "All data deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export {
  addProfessor,
  addStudents,
  addSubjects,
  assignSubjectsToStudent,
  assignSubjectsToProfessor,
  assignStudentsToProfessor,
  deleteAllData
};
