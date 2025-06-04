import type {APIRoute} from "astro";
import {renderToString} from 'react-dom/server';
import {createElement} from 'react';
import sgMail from '@sendgrid/mail';
import type UserMessage from "../types/user-message.ts";
import type {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import {isValidEmail} from "../utils/email.ts";
import {EmailTemplate} from "../components/email-template/email-template.tsx";

export const POST: APIRoute = async ({ request })=> {
    const apiKey = import.meta.env.SENDGRID_API_KEY;
    if (!apiKey) {
        console.error('SENDGRID_API_KEY is not set!')
        return new Response(JSON.stringify({error: 'Internal server error'}), {
            status: 500,
        });
    }
    if (request.headers.get("Content-Type") === "application/json") {
        const form: UserMessage = await request.json();
        let invalidRequestError = '';
        if (!form.firstName) invalidRequestError+='First Name is required. ';
        if (!form.lastName) invalidRequestError+='Last Name is required. ';
        if (!form.email) invalidRequestError+='Email is required. ';
        if (!isValidEmail(form.email)) invalidRequestError+='Email is not valid. ';
        if (!form.message) invalidRequestError+='Message is required. ';
        if (invalidRequestError) {
            return new Response(JSON.stringify({error: invalidRequestError}), {
                status: 400
            });
        }

        try {
            const letter: MailDataRequired = {
                to: form.email,
                from: 'irin.klimova@gmail.com',
                subject: 'User Form',
                // text: `${form.firstName} ${form.lastName}! Your message: ${form.message}`,
                html: renderToString(createElement(EmailTemplate, form)),
            }
            sgMail.setApiKey(apiKey);
            const response = await sgMail.send(letter);
            console.log(response[0].statusCode);
            console.log(response[0].headers);
            return new Response(JSON.stringify({message: 'Message was send!'}), {
                status: 200
            });
        } catch(error) {
            console.error(error);
        }
    }
    return new Response(JSON.stringify({error: 'Something went wrong. Try later'}), {
        status: 500,
    });
}