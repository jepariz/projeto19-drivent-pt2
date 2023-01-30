import { findTicketsType } from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    return await findTicketsType()
}

const ticketService = {
    getTicketsTypes
}

export default ticketService