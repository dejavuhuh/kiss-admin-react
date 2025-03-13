import type {Executor} from './';
import {AuthService, RoleService, VerificationCodeService} from './services/';

export class Api {
    
    readonly authService: AuthService
    
    readonly roleService: RoleService
    
    readonly verificationCodeService: VerificationCodeService
    
    constructor(executor: Executor) {
        this.authService = new AuthService(executor);
        this.roleService = new RoleService(executor);
        this.verificationCodeService = new VerificationCodeService(executor);
    }
}