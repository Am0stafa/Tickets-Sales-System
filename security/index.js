const express = require('express');
const rateLimit = require('express-rate-limit');
const { isIPBlocked } = require('./middlewares/IPBlocking');
const {corsHeaders} = require('./middlewares/cors');
const axios = require('axios');
const asyncHandler = require('express-async-handler')


const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    max : 100,
    message : "Too many requests, please try later"
})

app.get('/matches', corsHeaders , isIPBlocked , limiter , asyncHandler(async(req , res) => {
    const par = req.query.p
    const url = "https://ticketaty-shop.vercel.app/matches/?p=" + par
    await axios.get(url , { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((response) => (res.send(response.data)))
    .catch((e) => {res.send(e)})
}))

app.get('/matches/:id' , corsHeaders , isIPBlocked , limiter , asyncHandler(async (req , res) => {
    const par = req.params.id
    const url = "https://ticketaty-shop.vercel.app/matches/" + par
    await axios.get(url , { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((response) => (res.send(response.data)))
    .catch((e) => {res.send(e)})
}))

app.get('/search/:team' , corsHeaders , isIPBlocked , limiter , asyncHandler(async (req , res) => {
    const par = req.params.team
    const url = "https://ticketaty-shop.vercel.app/search/" + par
    await axios.get(url , {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((response) => (res.send(response.data)))
    .catch((e) => {res.send(e)})
    //axios call to actual endpoints except pending
}))

app.post('/reservation' , corsHeaders , isIPBlocked , limiter , asyncHandler(async (req , res) => {
    req.body;
    const url = "https://ticketaty-reservations.vercel.app/api/reservation"
    await axios.post(url , req.body , { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((response) => (res.send(response.data)))
    .catch((e) => {res.status(400).send(e)})
    //axios call to actual endpoints except pending
}))

app.get('/ticket/:email' , corsHeaders , isIPBlocked , limiter , asyncHandler(async (req , res) => {
    const par = req.params.email
    const url = "https://ticketaty-shop.vercel.app/ticket/" + par
    await axios.get(url , {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((response) => (res.send(response.data)))
    .catch((e) => {res.send(e)})
    //axios call to actual endpoints except pending
}))

app.options('/reservation',corsHeaders, async (req, res) => {
    res.status(200).json({message: 'ok'});
})

app.listen('4000', () => {
    console.log('app listening on port 4000')
})