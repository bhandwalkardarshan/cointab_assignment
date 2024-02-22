const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        // Define an array of allowed origins
        const allowedOrigins = ['http://localhost:5173', 'http://example2.com'];

        // Check if the incoming origin is in the array of allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            // Allow the request
            callback(null, true);
        } else {
            // Deny the request
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use('/', userRoutes);

const port = process.env.PORT || 3031;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
