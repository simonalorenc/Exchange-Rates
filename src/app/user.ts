export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    currencies: string[];
}

export interface registerUser {
    token: string;
    user: User
}

export interface UserToLogin {
    email: string;
    password: string
}