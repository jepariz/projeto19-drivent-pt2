import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { findUniqueTicket, isTicketFromUser } from "@/repositories/tickets-repository";


async function getTicketToPayIt(ticketId:number, userId: number) {

const ticketExists = await findUniqueTicket(ticketId)

if(!ticketExists) throw notFoundError()

const ticketOwner = await isTicketFromUser(ticketId, userId)

if(!ticketOwner) throw unauthorizedError()

await paymentRepository.findPayment(ticketId)

}

const paymentService = {
    getTicketToPayIt
}

export default paymentService