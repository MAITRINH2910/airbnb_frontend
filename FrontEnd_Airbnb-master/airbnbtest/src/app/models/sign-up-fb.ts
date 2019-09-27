export class SignUpFb {
    name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    providerLogin: string;
    image: string;

    constructor() {
        this.role = ['user'];
    }
}
