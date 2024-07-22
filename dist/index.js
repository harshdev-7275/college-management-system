"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use("/api/v1/", adminRoutes_1.default);
app.use("/api/v1/", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
