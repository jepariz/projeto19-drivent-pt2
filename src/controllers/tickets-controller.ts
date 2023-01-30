import { AuthenticatedRequest } from "@/middlewares";
import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";

async function getTypes(req: AuthenticatedRequest, res: Response) {

    try {
      const ticketTypes = await ticketService.getTicketsTypes()
      return res.status(httpStatus.OK).send(ticketTypes);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }

async function getTicketByUser(req: AuthenticatedRequest, res: Response) {

    const {userId} = req 

    try {
      const ticket = await ticketService.getTicket(userId)
      return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }


export{
    getTypes,
    getTicketByUser
}