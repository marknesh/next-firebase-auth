# Next Firebase Auth
A Next.js starter kit that uses Firebase Email Link for simple and secure passwordless login.

# Features
* File based routing using `/app` dir.
* Styled using **tailwindcss**.
* Firebase Email Link authentication.
* Server-side rendered user authentication.
* Firebase local emulator.
* Code is written in **TypeScript**.
* Api routes.
* Server and client components.

## Important Notice: Unstable Releases
> **Warning**
> Using `redirect` when rendering something on the server with the  try-catch method or .then/.catch may result in a `NEXT_REDIRECT` error. I will make sure to incorporate the necessary changes and update the warning message once the issue with `NEXT_REDIRECT` is resolved. See [issue](https://github.com/vercel/next.js/issues/49964).

## Coming soon
- [ ] Signup/Signin with other login providers.

## Running locally
1. Git clone
```sh
git clone https://github.com/marknesh/next-firebase-auth
```

2. Install dependencies.
```sh
yarn install
```

3. Copy `.env.example` to `.env.local` and update the environment variables.
```sh
cp .env.example .env.local
```

4. Initialize firebase emulator. `Please only allow the Authentication Emulator`.
```sh
firebase init emulators
```

5. Start firebase emulator.
```sh
firebase emulators:start
```

6. Start the local development server.
```sh
yarn run dev
```






