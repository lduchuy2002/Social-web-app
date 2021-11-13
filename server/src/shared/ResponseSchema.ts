import { ResponseType } from "@models/Response.model";

const GeneratedResponse = (payload: any, message: string, type: string): ResponseType => {
    return {
        data: payload,
        message,
        type
    }
}

export default GeneratedResponse;