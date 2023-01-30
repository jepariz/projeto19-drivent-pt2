import { TicketId } from "@/protocols";
import Joi from "joi";

export const ticketSchema = Joi.object<TicketId>({
    ticketTypeId: Joi.number().required(),
});

