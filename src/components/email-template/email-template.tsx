import type {FC} from 'react';
import type UserMessage from "../../types/user-message.ts";

export const EmailTemplate: FC<UserMessage> = (form) => {
    const lines = form.message.split('\n')
    return <div>
        <strong>{form.firstName} {form.lastName}</strong>
        <br />
        <span>Your message:</span>
        <br />
        {lines.map(line => <span>{line}<br /></span>)}
    </div>
}
