import { Product } from '../client/src/api';
require("dotenv").config();

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String,
    buyUrl: String,
    webSite: String,
    category: String,
    youTubeLink: String,
});

const ProductModel = mongoose.model('product', productSchema);
let fetchAll: any = {};

export async function fetchData() {
    await mongoose.connect(process.env.CONNECTION_STRING);

    fetchAll = await ProductModel.find({});
    return fetchAll as Product[];
}


const data = require('./products.json');
export const tempData = data as Product[];
