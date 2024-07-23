    import express from "express"
    import cors from "cors"
    import dotenv from "dotenv"
    import swaggerjsDoc from "swagger-jsdoc"
    import swaggerUi from "swagger-ui-express"

    dotenv.config()
    import adminRoutes from "./routes/adminRoutes"
    import userRoutes from "./routes/userRoutes"
    import { title } from "process"
    const app = express()



    app.use(express.json())


    const port = process.env.PORT || 5000
    const swaggerOptions = {
        definition:{
            openapi:"3.0.0",
            info:{
                title:"College Management System",
                version:"1.0.0",
                description:"This is a College Management System API"
            },
            servers:[
                {
                    url:`http://localhost:${port}/api/v1/`
                    
                }
            ]
        },
        apis:["./src/routes/*.ts"]
    }

    const swaggerSpec = swaggerjsDoc(swaggerOptions)

    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


    app.use(cors())

    app.use("/api/v1/", adminRoutes)
    app.use("/api/v1/", userRoutes)



    app.listen(port,()=>{
        console.log(`Listening on port ${port}`)
    })