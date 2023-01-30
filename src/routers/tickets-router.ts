import { createTicket, getTicketByUser, getTypes } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";


const ticketsRouter = Router();

ticketsRouter
.all("/*", authenticateToken)
.get("/tickets/types", getTypes)
.get("/tickets", getTicketByUser)
.post("/tickets", validateBody(ticketSchema), createTicket)

export { ticketsRouter };
