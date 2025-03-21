import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({

    host:"smtp-relay.brevo.com",
    port: 587,                 // Use 587 for STARTTLS, 465 for SSL
  secure: false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        
    },
    tls: {
        rejectUnauthorized: false, // Allows self-signed certs
      },

});

export default transporter;