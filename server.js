var FS = require("fs-extra");
var express = require("express");

FS.ensureFileSync("bestScore.txt");

function writeData(data) {
    var path = "bestScore.txt";
    FS.writeFileSync(path, data); 
}

function readData() {
    return FS.readFileSync("bestScore.txt", "utf-8");
}

var app = express();
app.use(express.static("static"));

app.get("/api/read-data", function (req, res) {
    var data = readData();
    console.log(data);
    res.json(data);
});

app.get("/api/write-data", function (req, res) {
    writeData(req.query.data);
    res.json(1);
});

app.listen(1337);
console.log("1337");