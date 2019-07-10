export interface Message {
    from: string;
    fromUserId: string;
    id: string;
    content: string;
    date: Date;
    seen: Boolean;
}

export interface Chat {
    participants: string[];
    id: string;
    messages: Message[]
}

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    tier: number;
    chats: Chat[]
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface CompanyAccountModel {
    id: string;
    name: string;
    projects: string[];
    address: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    users: User[]
}

export interface AuthResponse {
    user?: User,
    company?: CompanyAccountModel;
    success: boolean;
    access_token?: string;
    msg: string;
}