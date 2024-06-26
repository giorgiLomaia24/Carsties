import { DefaultSession } from 'next-auth'
import { Interface } from 'readline'



declare module "next-auth" {
    interface Session {
        user: {
            id:string
            username :string
        } & DefaultSession["user"]
    }

    interface Profile {
        username: string
        
    }

    interface User {
        username: string

    }
}



declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
        username: string,
        access_token? : string
    }
  }