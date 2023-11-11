"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// make route for policy and terms
// *************************************************************************************************
const express_1 = require("express");
const policyAndTerms_controller_1 = require("../controllers/policyAndTerms.controller");
const policyAndTermsRoute = (0, express_1.Router)();
policyAndTermsRoute.get('/policy-privacy', policyAndTerms_controller_1.getPolicy);
policyAndTermsRoute.get('/terms', policyAndTerms_controller_1.getTerms);
exports.default = policyAndTermsRoute;
