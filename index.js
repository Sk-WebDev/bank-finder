import express from "express";
import axios from "axios";

const port = 3000;
const app = express();
const statelink = "https://bank-apis.justinclicks.com/API/V1/STATE/";

//serving static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//render main page
app.get("/", (req, res) => {
    res.render("ifsc.ejs", { content: "Waiting for your input...😊", isValid: false });
});

app.post("/get-bank-details", async (req, res) => {
    try{
        const result = await axios.get("https://bank-apis.justinclicks.com/API/V1/IFSC/" + req.body.ifsc);
        const status = Object.keys(result.data).length > 0;
        const data = status ? result.data : "Please check your IFSC Code...😊";
        res.render("ifsc.ejs", { content: data, isValid: status});
    } catch (error) {
        res.render("ifsc.ejs", { content: "Please check your IFSC Code...😊", isValid: false});
    }
});

//IFSC Page
app.get("/get-ifsc-page", (req, res) => {
    res.redirect("/");
});

//Bank Details Page
app.get("/get-bankdet-page", async (req, res) => {
    try {
        const statelist = await axios.get(statelink);
        res.render("bankdet.ejs", {states: statelist.data, isValid: false, content: "Please Select Bank Details...😊"});
    } catch (error) {
        res.render("bankdet.ejs", {states: "Something went wrong"});
    }
});

app.post("/get-ifsc-code", async (req, res) => {
    const statelist = await axios.get(statelink);
    try{
        const jsonlink = statelink + req.body.state + "/" + req.body.district + "/" + req.body.city + "/" + req.body.center + "/";
        const resultJSON = await axios.get(jsonlink);
        const bankdetails = await axios.get(jsonlink + resultJSON.data);
        const status = Object.keys(bankdetails.data).length > 0;
        const data = status ? bankdetails.data : "Please check your Bank Details...😊";
        res.render("bankdet.ejs", { states: statelist.data, content: data, isValid: status});
    } catch (err) {
        res.render("bankdet.ejs", { states: statelist.data, content: "Please check your Bank Details...😊", isValid: false});
    }
});

//port listening
app.listen(port, () => {
    console.log("Server Started running in port: " + port);
});