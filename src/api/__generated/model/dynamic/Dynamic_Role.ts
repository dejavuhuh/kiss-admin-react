import type {Dynamic_Permission} from './';

export interface Dynamic_Role {
    readonly id?: number;
    readonly createdAt?: string;
    readonly name?: string;
    readonly code?: string;
    readonly inheritedRoles?: ReadonlyArray<Dynamic_Role>;
    readonly permissions?: ReadonlyArray<Dynamic_Permission>;
}
