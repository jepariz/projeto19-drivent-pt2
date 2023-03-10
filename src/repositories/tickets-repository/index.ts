import { prisma } from "@/config";

async function findTicketsType() {
    return prisma.ticketType.findMany()
}

async function findTicketByUser(userId:number) {
    return prisma.ticket.findFirst({
        where: {
            Enrollment: {
              userId: userId
            }
          },
          include: {
            TicketType: true
          }
    })
}

async function createTicket(ticketType:number, enrollment: number) {

return prisma.ticket.create({
    data:{
      ticketTypeId: ticketType,
      enrollmentId: enrollment,
      status: "RESERVED"
    },
    include: {
      TicketType: true
    }
  })
}

async function isTicketFromUser(ticketId:number, userId: number) {
  
  return prisma.ticket.findFirst({
    where: {
      AND: [{
        id: ticketId
      }, {
        Enrollment: {
          userId: userId
        }
      }]
    }
  })
}

async function findUniqueTicket(ticketId:number) {
  return prisma.ticket.findUnique({
    where: {id: ticketId}
  })
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

async function findTicketAndType(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}


export{
    findTicketsType,
    findTicketByUser,
    createTicket,
    isTicketFromUser,
    findUniqueTicket,
    updateTicketStatus,
    findTicketAndType
}