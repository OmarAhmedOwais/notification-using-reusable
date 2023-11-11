// render the two pages: policy and terms
// *************************************************************************************************
import { Request, Response } from 'express';


export const getPolicy = async (req: Request, res: Response) => {
    res.render('policy');
  };
 
export const getTerms = async (req: Request, res: Response) => {
    res.render('terms');
  };