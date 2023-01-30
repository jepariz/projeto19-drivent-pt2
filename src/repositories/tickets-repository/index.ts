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

export{
    findTicketsType,
    findTicketByUser
}