"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerms = exports.getPolicy = void 0;
const getPolicy = async (req, res) => {
    res.render('policyAndPrivacy');
};
exports.getPolicy = getPolicy;
const getTerms = async (req, res) => {
    res.render('terms');
};
exports.getTerms = getTerms;
