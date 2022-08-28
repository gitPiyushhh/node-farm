// Core Modules

const fs = require('fs');
const http = require('http');
const url = require('url');

// Third party Modules
const slugify = require('slugify')

// Our own Modules
const replaceTemplate = require('./modules/replaceTemplate');

// Syncronous code


///////////////////////////////////
///// Files

// textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log(textFile);

// textOut = `This is what we know about avacode: ${textIn} \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-synchronous code
// const textIn = fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if (err)  return console.log('Error occured..');

//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
    
//             fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err => {
//                 console.log('File written YAY..')
//             })
//         })
//     });

    
// });

// console.log('Reading File..');

///////////////////////////////////
///// SERVER

// HTML TEMPLATES

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));

console.log(slugs);

const server = http.createServer((req, res) => {
    // Getting the query and pathName and destructuring it 

    const {query, pathname} = url.parse(req.url, true);  


    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        
        res.end(output);
    }

    else if(pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];

        // Using the replace template fucntion we need override the old template..
        const output = replaceTemplate(tempProduct, product);

        // send the updated template as the response
        res.end(output);
    }

    else if (pathname === '/api') {
        // Header 
        res.writeHead(200, {
            'Content-type': 'application/json',
        })
        res.end(data);
    }

    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>OOPS ! Page Not Found..</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})