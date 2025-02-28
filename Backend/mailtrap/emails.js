import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async(email, verificationCode) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            category: "Email verification",
        });
        console.log('Email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};
export const sendWelcomeEmail = async(email, name) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "8e3df0f7-9639-4436-8bd1-7c23e9a93135",
            template_variables: {
                "name": name
            },
        });
        console.log('Email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};
export const sendPasswordRestInEmail = async(email, resetUrl) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        });
        console.log('Email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};
export const sendResetSuccessfulEmail = async(email) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: 'Password reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Reset Password',
        });
        console.log('Email sent successfully', response);
    } catch (error) {
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};