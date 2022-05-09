import { transport } from "../../mailtrap";
import { MailAdapter, SendMailData } from "../mail-adapters";

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail (data: SendMailData ) {

    const { body, subject } = data;

    await transport.sendMail({
      from: 'Equipe Feedget <oi@gmail.com>',
      to: 'Nathan Nascimento <ntcyborg@gmail.com',
      subject: subject,
      html: body
    })
  }
}

// await transport.sendMail({
//   from: 'Equipe Feedget <oi@gmail.com>',
//   to: 'Nathan Nascimento <ntcyborg@gmail.com',
//   subject: 'Novo feedback',
//   html: [
//     `<div styles="font-family: sans-serif; font-size: 16px; color; #111">`,
//     `<p>Tipo do feedback: ${subject}</p>`,
//     `<p>Comentário: ${comment}</p>`,
//     `</div>`
//   ].join('\n')
// })