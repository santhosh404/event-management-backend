import nodemailer from 'nodemailer';
import QRCode from "qrcode";
import moceansdk from 'mocean-sdk';
import { MOCEAN_KEY, MOCEAN_SECRET } from '../utils/envConfig.js';
import moment from "moment";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILUSERPASSWORD
    },
});

const mocean = new moceansdk.Mocean(
    new moceansdk.Client(MOCEAN_KEY, MOCEAN_SECRET)
);


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


const sendTicketEmailToUser = async (user, event, booking) => {
    const qrCodeDataURL = await QRCode.toDataURL(`Booking ID: ${booking._id}`);
    const ticketHTML = `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="background: #1e88e5; color: white; padding: 10px; text-align: center;">
                <h2 style="margin: 0;">${event.title}</h2>
                <p style="margin: 0;">${moment(event.date).format('ll')} at ${event.time}</p>
                <p style="margin: 0;">${event.location}</p>
            </div>

            <div style="padding: 20px; border-bottom: 1px dashed #ccc;">
                <p><strong>Booking ID:</strong> ${booking._id}</p>
                <p><strong>Name:</strong> ${user.username}</p>
                <p><strong>Seats Booked:</strong> ${booking.noOfSeats}</p>
                <p><strong>Booking Date:</strong> ${moment(booking.bookingDate).format('ll')}</p>
            </div>

            <div style="padding: 20px; text-align: center; border-bottom: 1px dashed #ccc;">
                <img src="${qrCodeDataURL}" alt="QR Code" style="width: 100px; height: 100px;" />
                <p style="margin-top: 10px;">Scan this QR code at the event</p>
            </div>

            <div style="padding: 20px; text-align: center; position: relative;">
                <p style="border-top: 1px dashed #ccc; padding-top: 10px; margin: 0; position: relative;">
                    <span style="background: white; padding: 0 10px; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); font-size: 12px; color: #888;">Tear Here</span>
                </p>
                <p style="font-size: 0.8em; color: #888;">Thank you for booking with us! Enjoy the event.</p>
            </div>
        </div>
    `;


    try {
        await transporter.sendMail({
            from: process.env.FROMUSER,
            to: user.email,
            subject: `Your Ticket for ${event.title} has been booked`,
            html: ticketHTML
        });
    } catch (e) {
        throw e;
    }

}

export { sendMailToResetPassword, sendTicketEmailToUser }