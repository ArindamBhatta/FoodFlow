export interface AuthPayload {
    _id: string;
    email: string;
    role: string; //'admin' | 'vendor' | 'customer';  This is the "Persona" identifier
    verified: boolean;
}
