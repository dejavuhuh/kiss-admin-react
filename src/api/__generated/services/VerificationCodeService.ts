import type {Executor} from '../';
import type {VerificationCodeIdentifier} from '../model/static/';

export class VerificationCodeService {
    
    constructor(private executor: Executor) {}
    
    readonly send: (options: VerificationCodeServiceOptions['send']) => Promise<
        void
    > = async(options) => {
        let _uri = '/verification-code/send';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type VerificationCodeServiceOptions = {
    'send': {
        readonly body: VerificationCodeIdentifier
    }
}
