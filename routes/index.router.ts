// make route for index
// *************************************************************************************************
import { Router } from "express";
import { getFacebook, getIndex} from '../controllers/policyAndTerms.controller';

const indexRoute = Router();

indexRoute.get('/', getIndex);
indexRoute.get('/facebook', getFacebook);

export default indexRoute;