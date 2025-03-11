import type {Executor} from '../';
import type {SignInRequest, SignUpRequest} from '../model/static/';

export class AuthService {
    
    constructor(private executor: Executor) {}
    
    readonly signIn: (options: AuthServiceOptions['signIn']) => Promise<
        void
    > = async(options) => {
        let _uri = '/auth/sign-in';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly signUp: (options: AuthServiceOptions['signUp']) => Promise<
        void
    > = async(options) => {
        let _uri = '/auth/sign-up';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type AuthServiceOptions = {
    'signUp': {
        readonly body: SignUpRequest
    }, 
    'signIn': {
        readonly body: SignInRequest
    }
}
