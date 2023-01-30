import { createTicket, getTicketByUser, getTypes } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";


const ticketsRouter = Router();

ticketsRouter
.all("/*", authenticateToken)
.get("/types", getTypes)
.get("/", getTicketByUser)
.post("/", validateBody(ticketSchema), createTicket)

export { ticketsRouter };
