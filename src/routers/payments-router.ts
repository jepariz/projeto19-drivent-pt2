import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentInfo, postPayment } from "@/controllers/payment-controller";
import { paymentSchema } from "@/schemas/payment-schema";


const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentInfo )
  .post("/process", validateBody(paymentSchema), postPayment)

export { paymentsRouter };