/* Write an api that grabs the original powerhouse-brewery.csv files using fs and reduces the data to the gift card number and the unused value "Unredeemed 
Amount" and the "Current Balance " As Of 01/13/2022" */

import console from "console";
import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method
const fs = require("fs"); //require file system methods
const PATH_OLD_CSV = './powerhouse-brewery.csv';

// read the old csv file
fs.readFile(PATH_OLD_CSV, 'utf8', (err, data) => {
    if (err) {
        console.log(err); 
        return;
    }
    console.log(typeof data);
    // splitt the data into an array of lines
    const lines = data.split('\n');
    lines.shift();   // remove the first lines
    lines.pop(); // remove the last line

//removes unnecessaryy data and create an new arrays of objects
let categoriesJSON = [];
lines.forEach(element => {
    if(element.length>40 && (element[0] === "C" || element[0] === "G")){
        let elementArray = element.split(',');
        categoriesJSON .push(
            {
                "giftCardNumber": elementArray[1],
                "redeemedAmount": elementArray[14],
                "currentBalance": elementArray[16]
            }
        );
    }
});
// check for the same gift card number 
let giftCardNumberArray = [];
categoriesJSON.forEach(element => {
    if(giftCardNumberArray.includes(element.giftCardNumber)){
        console.log(element.giftCardNumber);
    }
    else{
        giftCardNumberArray.push(element.giftCardNumber);
    }
});
/*
categoriesJSON = categoriesJSON.filter((item, index) => {
    return categoriesJSON.findIndex(i => i.giftCardNumber === item.giftCardNumber) === index;
});*/
//write categoriesJSON to a new JSON file
fs.writeFile('./powerhouse-brewery-reduced.json', JSON.stringify(categoriesJSON, null, "  "), (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('The file has been saved!');
});

//convert CategoriesJSON into a CSV writable stream
let categoriesCSV = 'Gift Card Number, Current Balance As Of 01/13/2022\n';
categoriesJSON.forEach(element => {
    categoriesCSV += `${element.giftCardNumber},${element.currentBalance}\n`;
});

//write the new csv file
fs.writeFile('./powerhouse-brewery-reduced.csv', categoriesCSV, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('The file has been saved!');

});
});



