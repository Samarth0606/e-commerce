const mongoose = require('mongoose');
const Product = require('./models/product');

//making array so that intially if database is dropped we would not face much prob in entering elemnt everytime
const products = [
    {
        name:"iphone 7",
        image:"https://images.unsplash.com/photo-1552072998-63ae038e4600?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lN3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 70000 ,
        desc:"the iphone 7 is a beast"

    },
    {
        name:"iphone 8",
        image:"https://images.unsplash.com/photo-1598093428081-17f985046a5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lOHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 80000 ,
        desc:"the iphone 8 is a beast"

    },
    {
        name:"iphone 9",
        image:"https://images.unsplash.com/photo-1529611239-29501290ad7b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aXBob25lOXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 90000 ,
        desc:"the iphone 10 is a beast"

    },
    {
        name:"iphone 10",
        image:"https://images.unsplash.com/photo-1578671999517-728f26ce77fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lMTB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 100000 ,
        desc:"the iphone 10 is a beast"

    },
    {
        name:"iphone 11",
        image:"https://images.unsplash.com/photo-1575294613905-f99b09f070ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lMTF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 110000 ,
        desc:"the iphone 11 is a beast"

    }

]
const seedDB =  async ()=>{
    await Product.insertMany(products);
    console.log("db seeded");
}

module.exports = seedDB;