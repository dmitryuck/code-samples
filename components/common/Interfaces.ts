export interface File {
    name: string;
}

export interface ServerResponse {
    success: boolean;
    error: string;
    data: any;
}

export interface Action {
    type: string;
    payload?: any;
}