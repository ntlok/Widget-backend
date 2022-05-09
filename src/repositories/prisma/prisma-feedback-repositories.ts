import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedback-repositories";


export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ comment, type, screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}