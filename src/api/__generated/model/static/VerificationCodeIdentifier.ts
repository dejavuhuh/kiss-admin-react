import type {Purpose, ReceiverType} from '../enums/';

export interface VerificationCodeIdentifier {
    readonly purpose: Purpose;
    readonly receiverType: ReceiverType;
    readonly receiver: string;
}
