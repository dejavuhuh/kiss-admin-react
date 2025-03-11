export type AllErrors = {
        family: 'VERIFICATION_CODE', 
        code: 'EXPIRED'
    } | {
        family: 'VERIFICATION_CODE', 
        code: 'MISMATCH'
    } | {
        family: 'AUTH', 
        code: 'ACCOUNT_ALREADY_EXISTS'
    } | {
        family: 'AUTH', 
        code: 'ACCOUNT_OR_PASSWORD_MISMATCH'
    };
export type ApiErrors = {
    'helloController': {
    }, 
    'authService': {
        'signUp': AllErrors & ({
                family: 'VERIFICATION_CODE', 
                code: 'EXPIRED', 
                readonly [key:string]: any
            } | {
                family: 'VERIFICATION_CODE', 
                code: 'MISMATCH', 
                readonly [key:string]: any
            } | {
                family: 'AUTH', 
                code: 'ACCOUNT_ALREADY_EXISTS', 
                readonly [key:string]: any
            }), 
        'signIn': AllErrors & ({
                family: 'AUTH', 
                code: 'ACCOUNT_OR_PASSWORD_MISMATCH', 
                readonly [key:string]: any
            })
    }, 
    'verificationCodeService': {
    }
};
