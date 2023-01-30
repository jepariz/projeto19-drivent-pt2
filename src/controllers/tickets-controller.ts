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


export{
    getTypes
}