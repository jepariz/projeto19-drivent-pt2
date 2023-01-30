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
   
   const newTicket = await createTicket(ticketType, enrolment.id) 
   
   const ticket = {
    id: newTicket.id,
    status: newTicket.status,
    ticketTypeId: newTicket.ticketTypeId,
    enrollmentId: newTicket.enrollmentId,
    TicketType: {
      id: newTicket.TicketType.id,
      name: newTicket.TicketType.name,
      price: newTicket.TicketType.price,
      isRemote: newTicket.TicketType.isRemote,
      includesHotel: newTicket.TicketType.includesHotel,
      createdAt: newTicket.TicketType.createdAt,
      updatedAt: newTicket.TicketType.updatedAt,
    },
    createdAt: newTicket.createdAt,
    updatedAt: newTicket.updatedAt
  };

  return ticket
}

const ticketService = {
    getTicketsTypes,
    getTicket,
    insertTicket
}

export default ticketService