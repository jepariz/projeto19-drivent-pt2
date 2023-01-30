import { prisma } from "@/config";
import { PaymentData } from "@/protocols";


async function findPayment(ticketId:number) {
    
    return prisma.payment.findFirst({
        where: {ticketId: ticketId}
    })
}

async function createPayment(ticketId:number, paymentData: PaymentData) {
    

    return await prisma.payment.create({
        data: {
          ticketId,
          ...paymentData
        }
      });  
}
  

const paymentRepository = {
    findPayment,
    createPayment
}

export default paymentRepository