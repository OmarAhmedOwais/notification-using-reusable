"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// make route for index
// *************************************************************************************************
const express_1 = require("express");
const policyAndTerms_controller_1 = require("../controllers/policyAndTerms.controller");
const indexRoute = (0, express_1.Router)();
indexRoute.get('/', policyAndTerms_controller_1.getIndex);
indexRoute.get('/facebook', policyAndTerms_controller_1.getFacebook);
exports.default = indexRoute;
