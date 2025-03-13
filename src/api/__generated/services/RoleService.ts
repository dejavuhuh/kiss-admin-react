import type {Executor} from '../';
import type {Dynamic_Role} from '../model/dynamic/';
import type {Page, RoleInput, RoleSpecification} from '../model/static/';

export class RoleService {
    
    constructor(private executor: Executor) {}
    
    readonly createRole: (options: RoleServiceOptions['createRole']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteRole: (options: RoleServiceOptions['deleteRole']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly list: (options: RoleServiceOptions['list']) => Promise<
        Page<Dynamic_Role>
    > = async(options) => {
        let _uri = '/roles';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.keyword;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'keyword='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<Dynamic_Role>>;
    }
    
    readonly updateRole: (options: RoleServiceOptions['updateRole']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type RoleServiceOptions = {
    'createRole': {
        readonly body: RoleInput
    }, 
    'deleteRole': {
        readonly id: number
    }, 
    'updateRole': {
        readonly id: number, 
        readonly body: RoleInput
    }, 
    'list': {
        readonly specification: RoleSpecification
    }
}
