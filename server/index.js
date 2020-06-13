const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name: 'kkb',
        age: 5,
        msg: 'welcome'
    })
})

app.listen(9090)