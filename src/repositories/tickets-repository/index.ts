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

async function createTicket(ticketType:number, userId: number) {

  const enrollment = await prisma.enrollment.findFirst({
    where:{id: userId}
  })

  return prisma.ticket.create({
    data:{
      ticketTypeId: ticketType,
      enrollmentId: enrollment.id,
      status: "RESERVED"
    }
  })
  
}

export{
    findTicketsType,
    findTicketByUser,
    createTicket
}