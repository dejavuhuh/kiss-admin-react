import type {Executor} from '../';

export class HelloController {
    
    constructor(private executor: Executor) {}
    
    readonly hello: () => Promise<
        string
    > = async() => {
        let _uri = '/hello';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<string>;
    }
}

export type HelloControllerOptions = {
    'hello': {}
}
