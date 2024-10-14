
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer';

export async function sendEmail(formData: any){
    try {
        const name = formData.get("firstName")
        const lastName = formData.get("lastName")
        const message = formData.get("message")
        const email = formData.get("email")
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.MY_PASSWORD,
            },
        });
        const mailOptions: Mail.Options = {
          from: process.env.MY_EMAIL,
          to: process.env.MY_EMAIL,
          // cc: email, (uncomment this line if you want to send a copy to the sender)
          subject: `Message from ${name} ${lastName} (${email})`,
          text: message,
        };
        const sendMailPromise = () =>
          new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
              if (!err) {
                resolve('Email sent');
                //redirect("/thankyou")
              } else {
                reject(err.message);
              }
            });
          });
        revalidatePath("/")
        await sendMailPromise()
    } catch (error: any) {
        console.log(error)
    }
}