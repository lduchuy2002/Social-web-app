export enum MessageType {
    'SUCCESS' = 'SUCCESS',
    'WARNING' = 'WARNING',
    'ERROR' = 'ERROR'
}

export class ResponseType {
    public type: string;
    public data: any | null;
    public message: string;
}