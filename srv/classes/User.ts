import { User as UserInterface } from '../../glob';

export class User {
    private document: UserInterface;

    static response(user: User): any {
        return {
            _id: user._id,
            name: user.name
        };
    }

    constructor(document: UserInterface) {
        this.document = document;
    }

    get _id(): string {
        return this.document._id;
    }

    get name(): string {
        return this.document.name;
    }

    get email(): string {
        return this.document.email;
    }

    get password(): string {
        return this.document.password;
    }

    get salt(): string {
        return this.document.salt;
    }

    get resetKey(): string {
        return this.document.resetKey;
    }

    get resetExp(): Date {
        return this.document.resetExp;
    }

    get photo(): string {
        return this.document.photo;
    }

    get country(): string {
        return this.document.country;
    }

    get active(): boolean {
        return this.document.active;
    }

    get balance(): number {
        return this.document.balance;
    }

    get donates(): number {
        return this.document.donates;
    }

    get rating(): number {
        return this.document.rating;
    }

    get deals(): number {
        return this.document.deals;
    }

    get role(): string {
        return this.document.role;
    }

    get wallet(): string {
        return this.document.wallet;
    }

    get config(): any[] {
        return this.document.config;
    }
}
