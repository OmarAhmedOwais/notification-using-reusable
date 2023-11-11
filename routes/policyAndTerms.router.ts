// make route for policy and terms
// *************************************************************************************************
import { Router } from "express";
import { getPolicy, getTerms } from '../controllers/policyAndTerms.controller';

const policyAndTermsRoute = Router();

policyAndTermsRoute.get('/policy-privacy', getPolicy);
policyAndTermsRoute.get('/terms', getTerms);

export default policyAndTermsRoute;
