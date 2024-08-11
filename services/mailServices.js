import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILUSERPASSWORD
    },
});


async function sendMailToResetPassword(emailId, resetPasswordLink) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.FROMUSER,
        to: emailId,
        subject: "Reset Your Password",
        html: `<!-- resetPasswordTemplate.html -->
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Password Reset</title>
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                   font-family: "Work Sans", sans-serif !important;
                    background-color: #f6f6f6;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: none;
                    width: 100% !important;
                }
                .container {
                    display: block;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #e9e9e9;
                }
                .content {
                    max-width: 600px;
                    margin: 0 auto;
                    display: block;
                    padding: 20px;
                }
                h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0 0 20px;
                }
                p {
                    font-size: 14px;
                    margin: 0 0 20px;
                }
                a {
                    color: #348eda;
                    text-decoration: underline;
                }
                .btn {
                    text-decoration: none;
                    color: #fff !important;
                    background-color: #348eda;
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    margin: 20px 0;
                    display: inline-block;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <table class="container">
                <tr>
                    <td>
                        <div class="content">
                            <h1>Password Reset Request</h1>
                            <p>Hello,</p>
                            <p>We received a request to reset your password. Click the button below to reset it:</p>
                            <p>
                                <a href="${resetPasswordLink}" class="btn">Reset Password</a>
                            </p>
                            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                            <p>Thanks,<br>The Support Team<br/><small><i>ShortIt - Free URL Shortner</i></small></p>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
        </html>`
    });

    return info;
}

export { sendMailToResetPassword }