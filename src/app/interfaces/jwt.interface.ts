import { EnvJwtStructure } from './../../environments/environment.development';
export interface IJwtData extends EnvJwtStructure {}

export interface IJwtToken {
    token: string
    message?: string
}