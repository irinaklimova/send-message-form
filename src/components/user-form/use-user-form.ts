import {useReducer} from "react";
import type {UserForm} from "../../types/user-form.ts";
import {isValidEmail} from "../../utils/email.ts";

type Action = {
    type: 'firstNameUpdate' | 'lastNameUpdate' | 'emailUpdate' | 'messageUpdate' | 'success' | 'error',
    value: string
} | { type: 'validation' }



const EMPTY_STATE: Omit<UserForm, 'error' | 'response'> = {
    firstName: {
        value: '',
        error: ''
    },
    lastName: {
        value: '',
        error: ''
    },
    email: {
        value: '',
        error: ''
    },
    message: {
        value: '',
        error: ''
    }
}

function getRequiredError(value: string, name: string): string {
    return value ? '' : `${name} is required`;
}

function reducer(state: UserForm, action: Action): UserForm {
    switch(action.type) {
        case 'firstNameUpdate':
            return {
                ...state,
                response: '',
                error: '',
                firstName: {
                    value: action.value,
                    error: ''
                },
            }
        case 'lastNameUpdate':
            return {
                ...state,
                response: '',
                error: '',
                lastName: {
                    value: action.value,
                    error: ''
                }
            }
        case 'emailUpdate':
            return {
                ...state,
                response: '',
                error: '',
                email: {
                    value: action.value,
                    error: ''
                }
            }
        case 'messageUpdate':
            return {
                ...state,
                response: '',
                error: '',
                message: {
                    value: action.value,
                    error: ''
                }
            }
        case 'validation':
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    error: getRequiredError(state.firstName.value, 'First Name')
                },
                lastName: {
                    ...state.lastName,
                    error: getRequiredError(state.lastName.value, 'Last Name')
                },
                email: {
                    ...state.email,
                    error: isValidEmail(state.email.value) ? (getRequiredError(state.email.value ,'Email')) : 'Not valid email'
                },
                message: {
                    ...state.message,
                    error: getRequiredError(state.message.value,'Message')
                },
            }
        case 'error':
            return {
                ...state,
                response: '',
                error: action.value
            }
        case 'success':
            return {
                ...EMPTY_STATE,
                error: '',
                response: action.value
            }
        default:
            return state;
    }
}

export default function useUserForm() {
    const [state, dispatch] = useReducer(reducer, {
        ...EMPTY_STATE,
        response: '',
        error: ''
    });
    return {
        state,
        updateFirstName: (value: string) => dispatch({type: 'firstNameUpdate', value}),
        updateLastName: (value: string) => dispatch({type: 'lastNameUpdate', value}),
        updateEmail: (value: string) => dispatch({type: 'emailUpdate', value}),
        updateMessage: (value: string) => dispatch({type: 'messageUpdate', value}),
        onSuccess: (res: string) => dispatch({type: 'success', value: res}),
        onFailure: (err: string) => dispatch({type: 'error', value: err}),
        showValidation: () => dispatch({type: 'validation'})
    };
}