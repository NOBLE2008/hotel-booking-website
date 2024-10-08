import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: { user: any }; request: any }) {
      return !!auth?.user;
    },
    async signIn({
      user,
      profile,
      account,
    }: {
      user: { email: string; name: string };
      profile: any;
      account: any;
    }) {
      try {
        const existingUser = await getGuest(user.email);
        if (!existingUser) {
          await createGuest({
            created_at: new Date(),
            fullName: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({
      session,
    }: {
      session: { user: { email: string; id: string } };
    }) {
      const user = await getGuest(session?.user?.email);

      if (!user) {
        throw new Error("User not found");
      }
      session.user.id = user.id;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// {
//   user: {
//     id: 'd578a420-11c8-4049-8869-29dd0bb321a7',
//     name: 'Noble Benjamin',
//     email: 'nobleben2008@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocIVgxdAaMhSEw4eHDt_yns98lxD9f-yQFFOV-FHJN7EME5arMA=s96-c'
//   },
//   account: {
//     access_token: 'ya29.a0AcM612ztfCt0c-FchPlI3_IJjE4kSVbvlu8NTXMtf4wE1U1nxJAlVYKBZbpn7sV0Lu8-AehLXRfI_HtkMv4PbC1olnJAFb1gyOMi-ffmFmfuo0t6NAGJA0hRM2qeCPzRmYtsVZrdRmUvV-qqGgpnvClrUe-Y_Cj1Mr97g420aCgYKAW0SARMSFQHGX2MiyPMvXzn33nMpwW9mSIAz0g0175',
//     expires_in: 3599,
//     scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
//     token_type: 'bearer',
//     id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4YTQyMWNhZmJlM2RkODg5MjcxZGY5MDBmNGJiZjE2ZGI1YzI0ZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDYwNTExNjA4MjQwLWpqdDN0bmhtcm4yNmhoamlsaGM3b2xrNGtvdXY3a2dpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA2MDUxMTYwODI0MC1qanQzdG5obXJuMjZoaGppbGhjN29sazRrb3V2N2tnaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDE4NTI2MTg2MDkzOTU0Njk0OCIsImVtYWlsIjoibm9ibGViZW4yMDA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUUlwUDZybF9tYUdUX05aM0oxeUlSdyIsIm5hbWUiOiJOb2JsZSBCZW5qYW1pbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJVmd4ZEFhTWhTRXc0ZUhEdF95bnM5OGx4RDlmLXlRRkZPVi1GSEpON0VNRTVhck1BPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5vYmxlIiwiZmFtaWx5X25hbWUiOiJCZW5qYW1pbiIsImlhdCI6MTcyODA4MjEyOSwiZXhwIjoxNzI4MDg1NzI5fQ.z8uh5tzpF92l4Dss6R_EeoXH830kAD_5ztyrOQIMNiFxkCo5gufru5Z6YQiNjlj0gH_vjZAW5DaCCCYImff8fccTqUf0m2wxcrrq_m6EF6f94iIddfHdS89XCbiFWXxF6gH7k9t3mOaXFiD70kYV5Cr-Om4Hq7tyQ9FoxjwytDkP74UU9GCWfCCs2JDAJxDmvBG7HTan5GFIs_VINfdfQP7qXkjDbl9whjPnQNthxcVYvo2eSLoMSKqWYNxOkrE0fYhrxjB6R3hOvQLLeDHtxmF5ge-N5MxlnBAn1DIszSEXInP2ucG_FGpysf-D83icDaTBGG3Z_fuNNulz0CPSsg',
//     expires_at: 1728085729,
//     provider: 'google',
//     type: 'oidc',
//     providerAccountId: '104185261860939546948'
//   },
//   profile: {
//     iss: 'https://accounts.google.com',
//     azp: '1060511608240-jjt3tnhmrn26hhjilhc7olk4kouv7kgi.apps.googleusercontent.com',
//     aud: '1060511608240-jjt3tnhmrn26hhjilhc7olk4kouv7kgi.apps.googleusercontent.com',
//     sub: '104185261860939546948',
//     email: 'nobleben2008@gmail.com',
//     email_verified: true,
//     at_hash: 'QIpP6rl_maGT_NZ3J1yIRw',
//     name: 'Noble Benjamin',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIVgxdAaMhSEw4eHDt_yns98lxD9f-yQFFOV-FHJN7EME5arMA=s96-c',
//     given_name: 'Noble',
//     family_name: 'Benjamin',
//     iat: 1728082129,
//     exp: 1728085729
//   }
// }

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
  // @ts-ignore
} = NextAuth(authConfig);
