const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
// Define a whitelist array of allowed origins
const whitelist = ['http://localhost:5173'];

// Configure CORS to dynamically set the allowed origin
app.use(cors({
    origin: function (origin, callback) {
        // Check if the incoming origin is in the whitelist
        if (!origin || whitelist.includes(origin)) {
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
