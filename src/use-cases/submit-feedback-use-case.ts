import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbackRepository } from "../repositories/feedback-repositories";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}


export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request

    if(!type) {
      throw new Error('Type is required')
    }
    if(!comment) {
      throw new Error('comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      comment,
      type,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
            `<div styles="font-family: sans-serif; font-size: 16px; color; #111">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot ? `<img src="${screenshot}" style="max-width: 500px;" />"`: ``,
            `</div>`
          ].join('\n'),  
    })
  }
}