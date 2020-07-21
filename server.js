const express = require("express");
const app = express()
const cp = require("child_process");
const fs = require("fs");
app.use(express.static("Microsoft_frontend"));
app.use(express.json());
app.set('views', 'view')
app.set('view engine', 'ejs')

let matrix = [];
let algoType = null, isDiagonal = null, typeHuristic = null;

app.post("/grid", function (req, res) {
    algoType = req.body.algoType;
    isDiagonal = req.body.isDiagonal;
    typeHuristic = req.body.typeHuristic;

    res.render("grid.ejs");
})

app.post("/solve", function (req, res) {
    // 2. JSon input
    var json = '{}' // your data;

// convert to javascript object:
    var obj = JSON.parse(json);

// get last item in array:
    var last = obj.education[obj.education.length - 1].school.name;
// result: some COLLEGE NAME I WANT TO GET
    console.log(req.body);
    fs.writeFileSync("file.json", JSON.stringify(req.body));
    let child = cp.spawn("javac", ["Microsoft_backend/mainfun.java"]);
    child.on("exit", function () {
        let dataStream = cp.spawn("java", ["hello"]);
        dataStream.stdout.on("data", function (data) {
            console.log(data + "");
            res.json({
                status: data
            })
        })
    })

})

app.listen(3000, function () {
    console.log("Server listening at port 3000");
});
