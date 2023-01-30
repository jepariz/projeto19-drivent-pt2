import { getTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";


const ticketsRouter = Router();

ticketsRouter
.all("/*", authenticateToken)
.get("/tickets/types", getTypes);

export { ticketsRouter };
