const express = require('express');
const app = express();
app.set("view engine", "ejs");

app.listen(3000);



app.get("/",(req, res)=> {
    res.send("Hello World");
    console.log("Request received");
});

app.get("/about",(req, res)=> {
    // res.send("About Page").status(200);
    // res.json({message: "about"});
    res.render("index");

});


const userRouter = require("./routes/user");
app.use("/user", userRouter);