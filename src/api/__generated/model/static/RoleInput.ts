export interface RoleInput {
    readonly name: string;
    readonly code: string;
    readonly inheritedRoleIds: ReadonlyArray<number>;
}
