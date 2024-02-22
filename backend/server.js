const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

const port = process.env.PORT || 3031;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
