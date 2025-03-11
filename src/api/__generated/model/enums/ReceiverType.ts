export const ReceiverType_CONSTANTS = [
    'EMAIL', 
    'PHONE'
] as const;
export type ReceiverType = typeof ReceiverType_CONSTANTS[number];
