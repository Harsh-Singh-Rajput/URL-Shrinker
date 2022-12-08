import express from 'express';
import ShortUrl from './models/shortUrl.js';
import Connect from './database/mongodb.js';
import * as dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
dotenv.config()

// Use to get directory 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

const app = express()
let url = ``
let fullUrl = ``
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}))

app.get('/',async function(req, res){
    // shortUrls = await ShortUrl.find()
    res.render("index", {fullUrl: fullUrl, url:url});
    url = ``;
    fullUrl = ``;
})

app.post('/shortUrls', async function(req, res){
    const response = await ShortUrl.create({full: req.body.fullUrl});
    url = `http://${req.headers.host}/${response.short}`;
    fullUrl = req.body.fullUrl;
    res.redirect('/')
})

app.get('/:shortUrl', async function(req, res){   
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
    if (shortUrl === null){
        return res.sendStatus(404);    
    } 
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full)

})

app.listen(process.env.PORT || 5000);



 Connect();