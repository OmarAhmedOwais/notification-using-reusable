// render the two pages: policy and terms
// *************************************************************************************************
import { Request, Response } from 'express';


export const getPolicy = async (req: Request, res: Response) => {
    res.render('policyAndPrivacy');
  };
 
export const getTerms = async (req: Request, res: Response) => {
    res.render('terms');
  };
