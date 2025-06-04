export type UserForm = {
    firstName: Field,
    lastName: Field,
    email: Field,
    message: Field,
    response: string,
    error: string
}

type Field = {
    value: string,
    error: string
}
