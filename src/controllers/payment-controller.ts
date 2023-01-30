
import { AuthenticatedRequest } from "@/middlewares";
import { CardData } from "@/protocols";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {

    try {
        const ticketId = Number(req.query.ticketId);
        const { userId } = req;
    
        if (!ticketId) {
          return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        const paymentInfo = await paymentService.getTicketToPayIt(userId, ticketId);
    
        if (!paymentInfo) {
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.OK).send(paymentInfo);
      } catch (error) {
        if (error.name === "UnauthorizedError") {
          return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
}

async function postPayment(req: AuthenticatedRequest, res: Response) {

    const ticketId = req.body.ticketId;
    const cardData = req.body.cardData as CardData
    const userId = req.userId

    try {
    
        if (!ticketId || !cardData) {
          return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        const payment = await paymentService.postPaymentInfo(ticketId, userId, cardData);
    
        if (!payment) {
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
    
        return res.status(httpStatus.OK).send(payment);
      } catch (error) {
        if (error.name === "UnauthorizedError") {
          return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
    
}

export {
    getPaymentInfo,
    postPayment
}