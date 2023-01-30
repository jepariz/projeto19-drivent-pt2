import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { findTicketsType, findTicketByUser } from "@/repositories/tickets-repository";


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

const ticketService = {
    getTicketsTypes,
    getTicket
}

export default ticketService