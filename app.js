const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const path = require('path');
const {checkToken} = require('./authorization/check-jwt-middleware')

const uri = process.env.DB_URL;
const PORT = process.env.PORT;
const app = express();


app.use(cors({
    credentials: true,
    // origin: '*'
    origin: 'http://localhost:4200'
}));
app.use(cookieParser());
app.use(checkToken)
app.use('/api/users', require('./routers/users'));
app.use('/api/auth', require('./routers/login'));
app.use('/api/fs', require('./routers/fs-router'));
app.use('/api/todo', require('./routers/todo-router'))

async function start() {
    try {
        if (process.env.NODE_ENV === 'production') {
            console.log('production mode');
            app.use('/', express.static(path.join(__dirname, 'front', 'build')));
            app.get('*', (req,res) =>{
                res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
            })
        }

        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err, connection) => {
            if (err) return console.log(err);
            console.log('Подключение к базе произошло успешно...');
        });
        app.listen(PORT, () => console.log('File System Stream App is work'));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

start();
