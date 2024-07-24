const express = require("express");
const app = express();
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });
const multer = require('multer');

const PORT = process.env.PORT || 5252

const cors = require('cors');

// Set up CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// parse the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(process.env.STATIC_DIR));

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.use('/pdf', require('./routes/generatePDFRoutes')(upload));

app.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});


app.listen(PORT, () => console.log(`server started on port ${PORT}`));
