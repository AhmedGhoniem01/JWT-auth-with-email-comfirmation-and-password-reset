const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const {loginRequired, isLogged} = require("./middlewares/authMiddleware");

//set ejs views engine
app.set("view engine" , "ejs");

//connect to mongo db using mongoose
dbURI = "mongodb+srv://ahmed:test1234@cluster0.3zhvexb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI ,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

//middelwares and static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

//--------------------------------------------------------------------
//get handlers
app.get('*', isLogged);
app.get('/' , (req,res) => {
    res.redirect("/dashboard");
});
app.get("/dashboard", loginRequired, (req,res) => {
    res.render("dashboard", {title: "Dashboard"});
});
//--------------------------------------------------------------------
//user route-handler
app.use("/" , userRouter);
//auth route-handler
app.use("/" , authRouter);
//--------------------------------------------------------------------
app.use((req,res) => {
    res.status(404).render("404" , {title:"404"});
});




