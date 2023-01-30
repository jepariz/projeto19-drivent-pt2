
import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {
    
    const userId = req.userId
    const ticketId = Number(req.query.ticketId) as number

    if(!ticketId){
        res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try {
        const paymentInfo = await paymentService.getTicketToPayIt(ticketId, userId)
        return res.status(httpStatus.OK).send(paymentInfo);
      } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
          return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
}

export {
    getPaymentInfo
}