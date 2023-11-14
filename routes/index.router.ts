// make route for index
// *************************************************************************************************
import { Router } from "express";
import { getFacebook, getIndex} from '../controllers/policyAndTerms.controller';

const indexRouter = Router();

indexRouter.get('/', getIndex);
indexRouter.get('/facebook', getFacebook);

export default indexRouter;