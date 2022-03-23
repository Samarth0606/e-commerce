const mongoose = require('mongoose');
const Product = require('./models/product');

//making array so that intially if database is dropped we would not face much prob in entering elemnt everytime
const products = [
    {
        name:" LV shirt",
        image: "https://images.unsplash.com/photo-1602832339346-f7501f06e09a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnQlMjBpbWFnZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 600 ,
        desc:"This is a shirt",
        category: "shirt"
    },
    {
        name:"shirt",
        image: "https://images.unsplash.com/photo-1602832339346-f7501f06e09a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnQlMjBpbWFnZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 600 ,
        desc:"This is a shirt2",
        category: "shirt"

    },
    {
        name:"shirt",
        image: "https://images.unsplash.com/photo-1602832339346-f7501f06e09a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnQlMjBpbWFnZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 600 ,
        desc:"This is a shirt3",
        category: "shirt"


    },
    {
        name:"jeans",
       image:"https://images.unsplash.com/photo-1604176354204-9268737828e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 6000 ,
        desc:"This is a JEANS",
        category: "jeans"


    },
    {
        name:"jeans",
       image:"https://images.unsplash.com/photo-1604176354204-9268737828e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 6000 ,
        desc:"This is a JEANS2",
        category: "jeans"

    },  
    {
        name:"jeans",
       image:"https://images.unsplash.com/photo-1604176354204-9268737828e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 6000 ,
        desc:"This is a JEANS3",
        category: "jeans"

    },
    {
        name:"kurta",
       image:"https://images.unsplash.com/photo-1622780432053-767528938f34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
        price: 6000 ,
        desc:"This is a kurta",
        category: "kurta"

    },
    {
        name:"kurta",
       image:"https://images.unsplash.com/photo-1622780432053-767528938f34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
        price: 6000 ,
        desc:"This is a kurta2",
        category: "kurta"

    },
    {
        name:"kurta",
       image:"https://images.unsplash.com/photo-1622780432053-767528938f34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
        price: 6000 ,
        desc:"This is a kurta3",
        category: "kurta"

    }

]
const seedDB =  async ()=>{
    await Product.insertMany(products);
    console.log("db seeded");
}

module.exports = seedDB;