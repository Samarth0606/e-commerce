const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware');  //using curly braces becoz we hav exported function inn th middleware


//listing all the products
router.get('/products',async(req,res)=>{
try{
    const products = await Product.find({});
    // res.render('products/index',{products,msg:req.flash('success')}); // key:success ke corresponding 1 msg flash hua h vo msg mei store hoga and as msg variable pass hojaega is index template mei
    res.render('products/index',{products});
    // since now we want to see it isliye hum index.ejs mei jaakr msg dekhenge

}
catch(e){
    console.log("something went wrong");
    req.flash('error' , 'Something went Wrong!!! Cant Show the Products');
    res.render('error');
}

    
})

//ADDING FORM
router.get('/products/new',isLoggedIn,(req,res)=>{
    try{
        //ye logic baar baar harr jagah likhna hoga isliye we will make a middleware and add it there
            // if(!req.isAuthenticated()){
            //     req.flash('error','not a valid user');
            //     res.redirect('/login');
            // }
            // if(req.isAuthenticated()){  //this line is not required any how
            // req.flash('success',`welcome ${req.user.username}`)

                res.render('products/new'); 
            //  }
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cant Add Form');
        res.render('error');
    }

})

//ADDING NEW PRODUCT VIA FORM AFTER MAKING THE NAME OBJECT IN new
router.post('/products',isLoggedIn,async(req,res)=>{
    try{
            const {product} = req.body;
            await Product.create(product);
            req.flash('success','product created successfully'); //this msg will be stored in session thats y we have installed session 
            
            // await Product.create(req.body.product); 
            res.redirect('/products');
    }


    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Add New Product');
        res.render('error');
    }


})

//showing a partiular product
 router.get('/products/:id',async(req,res)=>{
     try{
        const {id} = req.params;
        const product = await Product.findById(id).populate('reviews');
       
       //  console.log(product);
       //  res.render('products/show', {product,msg:req.flash('success')}); ab ye krne ki need nhi hi since we hav res.locals
        res.render('products/show', {product});

     }
     catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Show a Particular Product');
        
        res.redirect('/error');

     }


 })


 //creating new form for editing AND UPDATING
 router.get('/products/:id/edit', isLoggedIn,async(req,res)=>{
     try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('products/edit',{product});

     }
     catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Show a Particular Product');
        res.render('error');

     }
     
     
 })


 //updating new form for updation of editing
 router.patch('/products/:id',isLoggedIn,async(req,res)=>{
     try{
        const{product} = req.body;
        const{id} = req.params;
        await Product.findByIdAndUpdate(id,product);
        req.flash('success','product updated succesfully'); // after successful updation pop-up msg lao
        //rather than passing the msg again and again we write a middleware i.e res.locals vaala then no need to pass th msg in routes with product
        res.redirect(`/products/${req.params.id}`);

     }
     catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Update the Product');
        res.render('error');

     }

     
 })

 //deleteing the partiular product
 router.delete('/products/:id',isLoggedIn,async(req,res)=>{
     try{
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');

     }
     catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Delete the Product');
        res.render('error');

     }
     
 })

 //creating a new comment
 router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
     try{
          // res.send("namaste");
     const {id} = req.params;
     const product = await Product.findById(id);
     const review = new Review({
         user:req.user.username,
         ...req.body //jitni bhi cheeze req.body mei hai vo add krdo + jo user banaya h vo bhi krdo idhar--spread operator

     }); //naya review create hoga //spread operator use kr rhe h to get username also in comment
     product.reviews.push(review); // reviews ki arraay mei review daala h vo hai ye yahan objec ki id store hogi coz schema mei objct id hi store kri hai
    //  console.log(review);
     await review.save(); // review jo banda daal rha h usse save krlo
     await product.save(); //review product mei push krke chaghes kiye hai isliye usse bhi save
     res.redirect(`/products/${id}`);

     }
     catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Add the Review');
        res.render('error');

     }
     
 })



  //deleteing the partiular review
  router.delete('/products/:id/:idreview', isLoggedIn,async(req,res)=>{
      try{
          const{idreview} = req.params;
          // console.log("sam");
        // await Review.findAndRemove(req.params.id);
        await Review.findByIdAndDelete(idreview);
        // product.reviews.delete(review);
        res.redirect(`/products/${req.params.id}`);

      }
      catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Delete this Particular Review');
        res.render('error');

     }
    
  })


  //error page
  router.get('/error',(req,res)=>{
      res.render('error');
  })


module.exports = router;