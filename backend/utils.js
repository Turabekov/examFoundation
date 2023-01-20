const path = require("path")
const fs = require("fs")

function readFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data)=>{
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse((data)))
            }

        })
    });    
}

function writeFile(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(data), "utf8" , (err)=>{
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    });    
}

module.exports = {
    readFile, writeFile
}