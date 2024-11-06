//IMPORTS
import { CorsOptions } from "cors";

// C.O.R.S. OPITONS
export const corsConfig: CorsOptions = {
    origin: process.env.Frontend_Domain,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};