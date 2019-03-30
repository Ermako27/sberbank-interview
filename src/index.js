const express = require('express');
const path = require('path');

const userRouter = require('./UserRoutes');
const app = express();

const root = path.resolve(__dirname, '..', 'dist');

app.use(express.static(root))
app.use(express.json());

app.use('/api/users', userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});