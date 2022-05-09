import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMail = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMail }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,812asdfe34sd'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,812asdfe34sd'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without comment', async () => {
    

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,812asdfe34sd'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without screenshot right format', async () => {
    

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: '812asdfe34sd'
    })).rejects.toThrow()
  })
})