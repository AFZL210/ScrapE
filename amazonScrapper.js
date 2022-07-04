const axios = require('axios');
const cheerio = require('cheerio');

const productUrl = "https://www.amazon.in/Intel-BX8070110100F/dp/B08LKJPR5X/ref=sr_1_1?keywords=i3+10100f&qid=1656851086&sr=8-1";
const desiredPrice = 6500; // set the desired price

const handle = setInterval(scrapeData,5000);

const productInfo = {
    name : '',
    link : '',
    price : ''
};

//const handle = setInterval(scrapeData,10);

async function scrapeData() {
    // Fetch Data using axios
    const { data } = await axios.get(productUrl); 

    const $ = cheerio.load(data);
    const item = $('div#dp-container');

    // extract the data we need using cheerio
    productInfo.name = $(item).find("h1 span#productTitle").text();
    productInfo.link = productUrl;
    
    const price = $(item).find("span.a-price-whole")
    .first().text().replace(/[,.]/g, '');

    productInfo.price = parseInt(price);

    // compare with desired price and send message
    if( productInfo.price < desiredPrice ) {
       console.log(productInfo);
       clearInterval(handle);
    }

}