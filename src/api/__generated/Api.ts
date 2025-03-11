import type {Executor} from './';
import {AuthService, HelloController, VerificationCodeService} from './services/';

export class Api {
    
    readonly helloController: HelloController
    
    readonly authService: AuthService
    
    readonly verificationCodeService: VerificationCodeService
    
    constructor(executor: Executor) {
        this.helloController = new HelloController(executor);
        this.authService = new AuthService(executor);
        this.verificationCodeService = new VerificationCodeService(executor);
    }
}