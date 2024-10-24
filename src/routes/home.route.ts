//IMPORTS
import { Router, Request, Response } from "express";

// CONSTS. AND VARS.
const homeRouter = Router();

//SETTING-UP-ROUTE
homeRouter.get("/", (req: Request, res:Response) =>{
    res.send("You are not supposed to be here, GOOD SIR!!")
});

export default homeRouter;

