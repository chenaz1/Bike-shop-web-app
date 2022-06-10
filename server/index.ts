import express from 'express';
import bodyParser = require('body-parser');
import { tempData , fetchData } from './temp-data';
import { serverAPIPort, APIPath } from '../configuration/index';

import { Product } from "../client/src/api";

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

const cache: Record<string, Product[]> = {};

let date_filter: string = '';


app.use(bodyParser.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get(APIPath, async (req, res) => {

    // @ts-ignore
    const page: number = req.query.page || 1;

    // @ts-ignore
    const search: string = req.query.search || '';

    if (!cache.hasOwnProperty(search)) {

        const data = await fetchData();
        // cache[search] = tempData.filter((product) => (product.title.toLowerCase() + product.description.toLowerCase()).includes(search.toLowerCase()));
        cache[search] = data.filter((product) => (product.title.toLowerCase() + product.description.toLowerCase()).includes(search.toLowerCase()));
    
    }

    const paginatedData = cache[search].slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    res.send(paginatedData);
});

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

