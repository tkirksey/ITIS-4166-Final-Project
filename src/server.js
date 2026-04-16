import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let specs;
try {
    specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf-8'));
} catch (error){
    console.log('Failed to load OpenAPI specs: ', error);
    process.exit(1);
}

app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok'});
});