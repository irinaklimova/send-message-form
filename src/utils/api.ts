import type UserMessage from "../types/user-message.ts";

type FormResponse = {
    message: string
}

export async function sendMessage(form: UserMessage): Promise<FormResponse> {
    const res  = await fetch('/user-form', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    if (res.status === 200) return res.json();
    if (res.status === 400) {
        const body = await res.json();
        throw new Error(body.error);
    } else {
        throw new Error('Unknown error. Try again later');
    }
}