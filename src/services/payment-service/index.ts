import { notFoundError, unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import { findTicketAndType, findUniqueTicket, isTicketFromUser, updateTicketStatus } from "@/repositories/tickets-repository";

async function getTicketData(ticketId:number, userId: number) {

const ticketExists = await findUniqueTicket(ticketId)

if(!ticketExists) throw notFoundError()

const enrollment = await enrollmentRepository.findUserById(ticketExists.enrollmentId);
  
if (enrollment.userId !== userId) {
  throw unauthorizedError();
}

}

async function getTicketToPayIt(ticketId:number, userId: number) {

    await getTicketData(ticketId, userId)

   const payment = await paymentRepository.findPayment(ticketId)

   if (!payment) {
    throw notFoundError();
  }
  return payment;

}


async function postPaymentInfo(ticketId:number, userId: number, cardData: CardData) {

    await getTicketData(ticketId, userId)

    const ticket = await findTicketAndType(ticketId);
  
    const paymentData = {
      ticketId,
      value: ticket.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toString().slice(-4),
    };


   const payment = await paymentRepository.createPayment(ticketId, paymentData)
    await updateTicketStatus(ticketId)

    return payment

}


const paymentService = {
    getTicketToPayIt,
    postPaymentInfo
}

export default paymentService