const express = require('express');
const router = express.Router();

// const Product = require('../class/product.js');
// var product = new Product();

// const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
// const uri = "mongodb+srv://ahngbeom:123@4salestagram-cluster.poarys6.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
// const db = client.db("salestagram");
// const products_collection = db.collection("products");
// const productImages_collection = db.collection("product_images");

const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect("mongodb+srv://ahngbeom:1234@salestagram-cluster.poarys6.mongodb.net/salestagram?retryWrites=true&w=majority", {useNewUrlParser: true});

const productSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    details: {type: String, required: true},
    views: {type: Number, default: 0},
    like: {type: Number, default: 0},
    registration_date: {type: Date, default: Date.now()},
    update_date: {type: Date, default: Date.now()}
})

const Product = mongoose.model('Product', productSchema);

const fs = require('fs');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

let upload = multer({storage: storage});

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('index', {title: 'Salestagram'});
});

router.get('/product/register', async (req, res, next) => {
    res.render('product/register', {title: 'Salestagram - Register'});
});

router.get('/api/product/list', async (req, res, next) => {
    res.json(await Product.find());
});

router.get('/api/product/info', async (req, res, next) => {
    res.json(await Product.findById(req.query.id));
});

router.post('/api/product/registration', async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        details: req.body.details
    });

    await product.save()
        .then(() => {
            console.log("Saved: " + product);
        })
        .catch((err) => {
            console.error("Error: " + err);
        });
    res.json(product._id);
});

router.post('/api/product/remove', async (req, res, next) => {
    const id = req.body.id;
    await Product.findByIdAndDelete(id);
    res.json(id);
});

router.post('/api/product/modify', async (req, res, next) => {
    // await client.connect();
    // console.log(products_collection.findOne({_id: req.body.id}));
    // const result = await products_collection.findOneAndUpdate({_id: req.body.id}, {
    //     $set: {
    //         name: req.body.name,
    //         details: req.body.details,
    //         images: req.body.images,
    //         update_date: req.body.update_date
    //     }
    // }, {returnDocument: "after"});
    // await client.close();
    res.json(await Product.findByIdAndUpdate(req.body._id,
            {
                name: req.body.name,
                details: req.body.details,
                update_date: Date.now()
            }, {returnDocument: "after"}
        )
    );
});

router.post('/api/product/like/increase', async (req, res, next) => {
    res.json(await Product.findByIdAndUpdate(req.body.id, {$inc: {like: 1}}, {returnDocument: "after"}));
});

module.exports = router;
