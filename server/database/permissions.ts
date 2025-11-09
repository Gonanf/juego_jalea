import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

const statement = { 
    category: ["create", "share", "update", "delete"],
    event:  ["create", "share", "update", "delete"],
    games:  ["self","create", "share", "update", "delete"],
} as const; 

//TODO: Complete

export const ac = createAccessControl(statement); 

export const user = ac.newRole({
    ...defaultStatements,
    games: ["self"],
    category: [],
    event: []
})

export const admin = ac.newRole({
    ...adminAc.statements,
    category: ["create","delete","share","update"],
    event: ["create","delete","share","update"],
    user: ["ban"],
    games: ["create","delete","self","share","update"]
})