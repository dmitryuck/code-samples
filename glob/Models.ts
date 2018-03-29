export interface Category {
    _id: any;
    name: string;
    index: number;
    path: number[];
    icon?: string;
}

export interface User {
    _id: any;
    name: string;
    email: string;
    password: string;
    salt: string;
    resetKey: string;
    resetExp: Date;
    photo: string;
    countryId: string;
    active: boolean;
    balance: number;
    donates: number;
    rating: number;
    deals: number;
    role: string;
    wallet: string;
    config: Array<{
        param: string,
        value: string
    }>;
    created?: Date;
    visited?: Date;
}

export interface Payment {
    _id: any;
    dealId: string;
    userId: string;
    quantity: number;
    created?: Date;
}

export interface Notice {
    _id: any;
    userId: string;
    text: string;
    created?: Date;
}

export interface Lot {
    _id: any;
    userId: string;
    caption: string;
    description: string;
    price: number;
    categoryId: string;
    photosIds: Array<string>;
    link: string;
    status: string;
    created?: Date;
}

export interface Favorite {
    _id: any;
    userId: string;
    favorId: string;
    type: string;
}

export interface Donate {
    _id: any;
    senderId: string;
    receiverId: string;
    quantity: number;
    type: string;
    created?: Date;
}

export interface Deal {
    _id: any;
    lotId: string;
    sellerId: string;
    buyerId: string;
    chat: Array<{
        senderId: string,
        message: string,
        read: boolean,
        created: Date
    }>;
    status: string;
    created?: Date;
}

export interface Country {
    _id: any;
    key: string;
    value: string;
    flag: string;
    text: string;
}

export interface Bidder {
    _id: any;
    lotId: string;
    userId: string;
    earned: Array<{userId: string, quantity: number}>;
}

export interface Admin {
    _id: any;
    total: number;
    income: number;
    wallet: string;
}

export interface Media {
    _id: any;
    url: string;
    valid: boolean;
    created?: Date;
}
