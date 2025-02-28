import { MailtrapClient } from 'mailtrap'
const TOKEN = "6a0f95bfab94bd28bacb876210cba37e";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Auth-App",
};