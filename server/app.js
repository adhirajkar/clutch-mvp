const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/protected', require('./routes/protected.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
