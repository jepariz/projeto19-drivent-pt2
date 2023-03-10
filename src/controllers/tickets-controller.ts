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

    const userId = req.userId

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

async function createTicket(req: AuthenticatedRequest, res: Response) {

  if (req.body.ticketTypeId === undefined) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
    
    const ticketTypeId = req.body.ticketTypeId as number
    const userId = req.userId

    try {
        const insertTicket = await ticketService.insertTicket(ticketTypeId, userId)
        return res.status(httpStatus.CREATED).send(insertTicket);
      } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);  
      }

}

export{
    getTypes,
    getTicketByUser,
    createTicket
}