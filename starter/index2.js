const http = require('http');
const url = require('url');
const fs = require('fs');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(__dirname + '/dev-data/data.json', 'utf-8');
const product = fs.readFileSync(__dirname + '/templates/product.html', 'utf-8');
const overview = fs.readFileSync(
    __dirname + '/templates/overview.html',
    'utf-8'
);
const card = fs.readFileSync(__dirname + '/templates/card.html', 'utf-8');

const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    //overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead('200', {
            'Content-type': 'text/html',
        });
        const cardsHtml = dataObject
            .map((element) => replaceTemplate(card, element))
            .join('');

        let overwiewFull = overview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(overwiewFull);
    }
    //product page
    if (pathname === '/product') {
        console.log(query);
        const productObj = dataObject[query.id];
        res.writeHead('200', {
            'Content-type': 'text/html',
        });
        const html = replaceTemplate(product, productObj);
        res.end(html);
    }
    //API
    if (pathname === '/api') {
        res.writeHead('200', {
            'Content-type': 'text/html',
        });
        res.end(`<h1>API<h1/> <div>${page}</div>`);
        //Not found
    } else {
        res.writeHead('404', {
            'Content-type': 'text/html',
            'my-own-header': 'hey from Olga',
        });
        res.end('<h1>page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to request on port 8000');
});
