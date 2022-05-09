import { Router } from "express";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "../prisma";
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedback-repositories";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";


export const router = Router()

router.get('/', async (req, res) => {
  const result = await prisma.feedback.findMany()

  return res.json(result)
})

router.post("/", async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot
  })



  return res.status(201).json({data: 'create succeful'})

})