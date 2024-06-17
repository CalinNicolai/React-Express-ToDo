const nodeMailer = require('nodemailer')
class MaiilService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ' + process.env.API_URL,
            text: '',
            html:
                `
            <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
                <h1 style="color: #007BFF;">To activate your account click the link below</h1>
                <p style="font-size: 16px;">To activate your account click the link below</p>
                <a href="${link}" style="display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Activate</a>
            </div>
            `

        })
    }
}

module.exports = new MaiilService();