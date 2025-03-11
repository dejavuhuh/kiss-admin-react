import type {ReceiverType} from '../enums/';

export interface SignUpRequest {
    readonly accountType: ReceiverType;
    readonly account: string;
    readonly verificationCode: string;
    readonly password: string;
}
