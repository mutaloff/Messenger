import express from "express";
import fs from "fs"
import App from './App'
import ReactDOMServer from 'react-dom/server'

let app = express();

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            return res.send(data.replace('<div id="root"></div>', `<div id='root'>${ReactDOMServer.renderToString(<App />)}</div>`))
        }
    })
})

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.listen(5003);