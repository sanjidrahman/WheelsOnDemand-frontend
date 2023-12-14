export interface IProfile {
    email?: string;
    name?: string;
    phone?: number;
}

export interface IPasswordChange {
    confirmpass: string;
    newpass: string;
    oldpass: string;
  }
  
