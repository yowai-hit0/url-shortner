"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, dbConfig_1.default)();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json()); //allows json responses
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/", shortUrl_1.default);
app.get('/', (req, res) => {
    res.send('Hello there');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
