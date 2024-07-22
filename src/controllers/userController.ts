import { Request, Response } from "express";
import { prisma } from "../configs/prisma";
const getAllProfessors = async (req: Request, res: Response) => {
  try {
    const professors = await prisma.professor.findMany();
    res.status(200).json({
      success: true,
      data: {
        professors: professors,
        total: professors.length,
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

const getProfessorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid id",
      });
    }
    const professor = await prisma.professor.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      data: {
        professor: professor,
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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    return res.status(200).json({
      success: true,
      data: {
        students: students,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid id",
      });
    }
    const student = await prisma.student.findUnique({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany();
    return res.status(200).json({
      success: true,
      data: {
        subjects: subjects,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid id",
      });
    }
    const subject = await prisma.subject.findUnique({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
const getAllAdmissionRecords = async (req: Request, res: Response) => {
  try {
    const addmissionRecords = await prisma.admissionRecord.findMany({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getAdmissionRecordById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid id",
      });
    }

    const admissionRecord = await prisma.admissionRecord.findUnique({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


const getSubjectsByProfessorId = async(req:Request, res:Response)=>{
    try {
        const { id } = req.params;
        
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const professorExist = await prisma.professor.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!professorExist){
            return res.status(404).json({
                success: false,
                error: "Professor not found",
            });
        }

        const subjects = await prisma.subject.findMany({
            where:{
                professorId:Number(id)
            },
            include:{
                professor:true,
            }
        })
        return res.status(200).json({
            success: true,
            data: {
                subjects: subjects,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })        
    }
}


const getStudentsByProfessorId =  async( req:Request, res:Response)=>{
    try {
        const { id } = req.params;
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }
        const professorExist = await prisma.professor.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!professorExist){
            return res.status(404).json({
                success: false,
                error: "Professor not found",
            });
        }

        const students = await prisma.student.findMany({
            where:{
                professors:{
                    some:{
                        id:Number(id)
                    }
                }   
            },
            include:{
                professors:true
            }
        })

        return res.status(200).json({
            success: true,
            data: {
                students: students,
            },
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
        
    }
}

const getProfessorByStudentId = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            });
        }

        const studentExist = await prisma.student.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!studentExist){
            return res.status(404).json({
                success: false,
                error: "Student not found",
            });
        }

        const professors = await prisma.professor.findMany({
            where:{
                students:{
                    some:{
                        id:Number(id)
                    }
                }
            },
            include:{
                students:true
            }
        })

        res.status(200).json({
            success: true,
            data: {
                professors: professors,
            },
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })        
    }
}

const getSubjectsByStudentId = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                success: false,
                error: "Please provide valid id",
            })
        }

        const studentExist = await prisma.student.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!studentExist){
            return res.status(404).json({
                success: false,
                error: "Student not found",
            });
        }

        const subjects = await prisma.subject.findMany({
            where:{
                students:{
                    some:{
                        id:Number(id)
                    }
                }
            },
            include:{
                students:true
            }
        })

        return res.status(200).json({
            success: true,
            data: {
                subjects: subjects,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
        
    }
}



export {
  getAllProfessors,
  getProfessorById,
  getAllStudents,
  getStudentById,
  getAllSubjects,
  getSubjectById,
  getAllAdmissionRecords,
  getAdmissionRecordById,
  getSubjectsByProfessorId,
  getStudentsByProfessorId,
  getProfessorByStudentId,
  getSubjectsByStudentId
};