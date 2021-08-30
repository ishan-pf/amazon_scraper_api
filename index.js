const express = require('express');

const request = require('request-promise');

// const bodyParser = require('body-parser')

const app = express();
// app.use(bodyParser.urlencoded({ extended:true}));
// app.use(bodyParser.json());

const PORT = process.env.PORT || 5000 ;

app.use(express.json());

const APIKEY = "15f4943493aaa65ab2dc890ad43fc964";
// const  generatScraperUrl(APIKEY) = `http://api.scraperapi.com/?api_key=${APIKEY}&autoparse=true`;

const generatScraperUrl = (APIKEY) => `http://api.scraperapi.com/?api_key=${APIKEY}&autoparse=true`;

const ReqCount = `http://api.scraperapi.com/account?api_key=${APIKEY}`;

app.get( '/' , (req, res) => {

    res.send('Welcome to Amazon Scraper API!!!');
});

app.get( '/products/:productId' ,async(req,res) => {

    const { productId } = req.params;

    const { APIKEY } = req.query;

    try{
        const response = await request(`${generatScraperUrl(APIKEY)}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response));
    }
    catch(error){

        res.json(error);
    }

})

app.get( '/products/:productId/reviews' ,async(req,res) => {

    const { productId } = req.params;

    try{
        const response = await request(`${generatScraperUrl(APIKEY)}&url=https://www.amazon.in/product-reviews/${productId}`)

        
        const review = JSON.parse(response);

        // const data = review.map( (element) => element === "data")

        res.json(review);
    }
    catch(error){

        res.json(error);
    }

})



app.get( '/products/:productId/offers' ,async(req,res) => {

    const { productId } = req.params;

    try{
        const response = await request(`${generatScraperUrl(APIKEY)}&url=https://www.amazon.in/gp/product/offer-listing/${productId}`)

        const review = JSON.parse(response);

        const data = review.top_ratings; 
        res.json(data);
    }
    catch(error){

        res.json(error);
    }

})



app.get( '/search/:searchQuery' ,async(req,res) => {

    const { searchQuery } = req.params;

    try{
        const response = await request(`${ generatScraperUrl(APIKEY)}&url=https://www.amazon.in/s?k=${searchQuery}`)

     
        res.json(JSON.parse(response));
    }
    catch(error){

        res.json(error);
    }

})


app.listen(PORT , () => {
    console.log(`The Server is up and running on the port ${PORT}`);
});