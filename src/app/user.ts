export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    currencies: string[];
}

export interface UserToLogin {
    email: string;
    password: string
}