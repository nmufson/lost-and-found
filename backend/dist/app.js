"use strict";
// import express from 'express';
// import cors from 'cors';
// import router from './routes/router';
const express = require('express'); // Using CommonJS syntax
const cors = require('cors');
const router = require('./routes/router');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Express app listening on port ${PORT}!`));
