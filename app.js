const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
// const productRoutes = require('./routes/product');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//product routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');




//conecting dbs
mongoose.connect('mongodb://localhost:27017/shopApp', // shopApp naam ka database hoga to conect hojaega else create hojjega
            {useNewUrlParser: true, 
             useUnifiedTopology: true,
             useFindAndModify:false,
             useCreateIndex:true
            })
            .then(()=>{
                console.log("mongoose DB connected")
            })

            
            .catch(err=>{
                console.log("mongoose DB didnot connect");
                console.log(err);
            })

            //SEEDING DBS
            // seedDB();

//configuring the view engine   
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'))
//views is for ejs files and public is for static files

//configuring static files
app.use(express.static(path.join(__dirname,'/public')))
//req ki body ko parse krna hai therefore we will use
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


//.env file bnate hai usemdaalte hai
const sessionConfig = {
    secret:"my name is vohra",
    resave:false,
    saveUninitialized:true
}

//donot forget to use session() before passport.session()
app.use(session(sessionConfig));
app.use(flash()); 

//configuring passport after requiring it i.e initialising passport and sessions for storing user info
app.use(passport.initialize());
//donot forget to use session() before passport.session() 
app.use(passport.session()); 

//configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()))

//user ko session mei store krna and yaad rkhna login krne pr
passport.serializeUser(User.serializeUser());
//user ko session mei se hatana logout krne pr
passport.deserializeUser(User.deserializeUser());

//making middleware for not writing msg thing again and again
// res.local harr 1 route par jaakr khhud hi msg vaala kaam krdega (res hai req nhi make sure of it unlike other app.use statements)
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next(); //since middleware hai isliye next is compulsary
})

app.use(productRoutes);
app.use(authRoutes);

    app.get('/',(req,res)=>{
        res.send("welcome to landing page");
    })


app.listen(3000,()=>{
    console.log("server running at port 3000");
})