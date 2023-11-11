// make route for index
// *************************************************************************************************
import { Router } from "express";
import { getIndex} from '../controllers/policyAndTerms.controller';

const indexRoute = Router();

indexRoute.get('/', getIndex);
indexRoute.get('/facebook', getIndex);

export default indexRoute;