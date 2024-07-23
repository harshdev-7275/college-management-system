"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "College Management System",
            version: "1.0.0",
            description: "This is a College Management System API"
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1/`
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use((0, cors_1.default)());
app.use("/api/v1/", adminRoutes_1.default);
app.use("/api/v1/", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
