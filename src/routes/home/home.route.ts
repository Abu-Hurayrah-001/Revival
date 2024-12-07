//IMPORTS
import { Router, Request, Response } from "express";

// CONSTS. AND VARS.
const homeRouter: Router = Router();

//ROUTES
homeRouter.get("/", (req: Request, res:Response) => {
    res.send("Feeling brave today, aren't we!!");
    return;
});

export default homeRouter;

