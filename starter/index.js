
const fs = require('fs');

//blocking synchronyos way 

// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textInput);
// const textOutput = `this is what we know about avocado: ${textInput}. \n Created on ${Date.now()}`

// fs.writeFileSync(__dirname + '/txt/input.txt', textOutput);

// console.log('file is written');

//non-blocking asynchronyos way 

fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
console.log('file has been written')
            })
        });
    });
});

console.log('will read file');