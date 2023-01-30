import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { findTicketsType, findTicketByUser, createTicket } from "@/repositories/tickets-repository";


async function getTicketsTypes() {
    return await findTicketsType()
}

async function getTicket(userId:number) {

    const enrolment = await enrollmentRepository.findUserById(userId)

    if(!enrolment) throw notFoundError()

    const ticket = await findTicketByUser(userId)

    if(!ticket) throw notFoundError()

    return ticket
}

async function insertTicket(ticketType:number, userId:number) {
    
    const enrolment = await enrollmentRepository.findUserById(userId)

    if(!enrolment) throw notFoundError()
   
   await createTicket(ticketType, userId) 

}

const ticketService = {
    getTicketsTypes,
    getTicket,
    insertTicket
}

export default ticketService