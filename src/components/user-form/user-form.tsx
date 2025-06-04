import Form from "../form/form.tsx";
import InputGroup from "../input-group/input-group.tsx";
import Button from "../button/button.tsx";
import Input from "../input/input.tsx";
import {sendMessage} from "../../utils/api.ts";
import type {UserForm} from "../../types/user-form.ts";
import {isValidEmail} from "../../utils/email.ts";
import useUserForm from "./use-user-form.ts";

type Handler = (state: UserForm) => boolean;
const isFormValid: Handler = (state) => !!state.firstName.value && !!state.lastName.value && !!state.email.value && !!state.message.value && isValidEmail(state.email.value);

export default function UserForm() {
    const {state, updateFirstName, updateLastName, updateEmail, updateMessage, showValidation, onSuccess, onFailure} = useUserForm();

    function onSubmit() {
        if (isFormValid(state)) {
            const form = {
                firstName: state.firstName.value,
                lastName: state.lastName.value,
                email: state.email.value,
                message: state.message.value,
            }
            sendMessage(form).then(res => {
                onSuccess(res.message);
            }).catch(err => {
                onFailure(err.message)
            });
        } else {
            showValidation()
        }
    }

    return <Form onSubmit={onSubmit}>
        <InputGroup>
            <Input
                field={state.firstName}
                setField={(e) => updateFirstName(e.target.value)}
                placeholder='Fist Name *' id='firstName'/>
            <Input field={state.lastName} setField={(e) => updateLastName(e.target.value)} placeholder='Last Name *' id='lastName'/>
        </InputGroup>
        <Input field={state.email} setField={(e) => updateEmail(e.target.value)} placeholder='Work Email *' id='email'/>
        <Input field={state.message} setField={(e) => updateMessage(e.target.value)} id="message" placeholder="Enter your message" label="Message *" isTextarea />
        <p className="gray-text">
            For information about our privacy practices and commitment to protecting your privacy, please review our <a className="link" href="/privacy">Privacy Policy</a>.
        </p>
        <div>
            <Button type="submit">Send Message</Button>
            {state.error && <span className='error'>{state.error}</span>}
            {state.response && <span className='success'>{state.response}</span>}
        </div>
    </Form>
}