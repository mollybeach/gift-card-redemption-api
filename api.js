/*
write an api that grabs the powerhouse-brewery.csv files using fs and reduces the data to the credit card number and the unused value "Unredeemed 
Amount" and the  "Current Balance 
As Of 01/13/2022" */

import console from "console";
import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method
const fs = require("fs"); //require file system methods
const PATH_OLD_CSV = './powerhouse-brewery.csv';

console.log(`The old csv file is ${PATH_OLD_CSV}`);
// read the old csv file
fs.readFile(PATH_OLD_CSV, 'utf8', (err, data) => {
    if (err) {
        console.log('17 ');
        console.log(err);
        return;
    }
    console.log(typeof data);
    // split the data into an array of lines
    const lines = data.split('\n');
    // remove the first line
    lines.shift();
    // remove the last line
    lines.pop();

let categoriesJSON = [];

lines.forEach(element => {
    if(element.length>40 && element[0] === "C"){
        let elementArray = element.split(',');
        categoriesJSON .push(
            {
                "creditCardNumber": elementArray[1],
                "unredeemedAmount": elementArray[15],
                "currentBalance": elementArray[16]
            }
        );
    }
});
fs.writeFile('./powerhouse-brewery-reduced.json', JSON.stringify(categoriesJSON, null, "  "), (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('The file has been saved!');
});

//convert categoriesjson into a CSV file
let categoriesCSV = 'Credit Card Number,Unredeemed Amount, Current Balance\n';
categoriesJSON.forEach(element => {
    categoriesCSV += `${element.creditCardNumber},${element.unredeemedAmount},${element.currentBalance}\n`;
});

//write the new csv file
fs.writeFile('./powerhouse-brewery-reduced.csv', categoriesCSV, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('The file has been saved!');
});
//write categoriesJSON to a new file
});



