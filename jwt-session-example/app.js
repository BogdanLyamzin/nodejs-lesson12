const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authApi = require('./api');

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());

require('./configs/config-passport')

app.use('/api', authApi)

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Page not found`,
        data: 'Not found',
    })
})

app.use((err, _, res, __) => {
    console.log(err.stack)
    res.status(500).json({
        status: 'fail',
        code: 500,
        message: err.message,
        data: 'Internal Server Error',
    })
})

const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=>{
    const port = PORT || 3000

    app.listen(port, function () {
        console.log(`Server running. Use our API on port: ${PORT}`)
    })
})





