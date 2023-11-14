"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// make route for index
// *************************************************************************************************
const express_1 = require("express");
const policyAndTerms_controller_1 = require("../controllers/policyAndTerms.controller");
const indexRouter = (0, express_1.Router)();
indexRouter.get('/', policyAndTerms_controller_1.getIndex);
indexRouter.get('/facebook', policyAndTerms_controller_1.getFacebook);
exports.default = indexRouter;
