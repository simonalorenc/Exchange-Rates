export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string
}

export interface UserToLogin {
    email: string;
    password: string
}
