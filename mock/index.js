const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const admin = require('./data/admin.json')
const editor = require('./data/editor.json')
const adminPermission = require('./data/admin_permission.json')
const editorPermission = require('./data/editor_permission.json')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.use(express.urlencode() );

app.post('/user/login', (req, res) => {
    const username = req.body.username
    if (username === 'admin') {
        res.send(admin)
    } else {
        res.send(editor)
    }
})

app.post('/user/permission',(req,res)=>{
    const username = req.body.username
    if (username === 'admin') {
        res.send(adminPermission)
    } else {
        console.log('editor')
        res.send(editorPermission)
    }
})

app.listen(3000, () => {
    console.log('服务器运行在3000')
})