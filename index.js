import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

//serving static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//render main page
app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for your input...😊", isValid: false });
});

app.post("/get-details", async (req, res) => {
    try{
        const ifscCodeStr = req.body.ifsc;
        const result = await axios.get("https://bank-apis.justinclicks.com/API/V1/IFSC/" + ifscCodeStr);
        const status = Object.keys(result.data).length > 0;
        const data = status ? result.data : "Please check your IFSC Code...😊";
        res.render("index.ejs", { content: data, isValid: status});
    } catch (error) {
        res.render("index.ejs", { content: "Please check your IFSC Code...😊", isValid: false});
    }
});

//port listening
app.listen(port, () => {
    console.log("Server Started running in port: " + port);
});