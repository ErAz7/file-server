const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 80;

// Set up multer storage


const storage = multer.diskStorage({
    destination: 'upload',
    filename: (_, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


// Serve static files (for HTML and JS)
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const pass = req.headers.pass;

    if (pass !== 'Pass!') {
        res.status(403).end();
        return;
    }

    next();
});

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded!');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});