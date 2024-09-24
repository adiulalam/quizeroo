# Quizeroo

A full-stack quiz web-app that can be used for creating and sharing quiz. The application also includes authentication, AI quiz generation, and a dashboard for comprehensive information visualization.

Created with Next.js, NextAuth, TRPC, Websocket, Shadcn, and Tailwind.

## Installation
To use the application please make sure to clone the package, open terminal and then follow the instruction below.

### Setup the environment varibles, see `.env.example`


#### Use `.env` for Production and `.env.local` for development

### Install the packages
```
npm i
```

### Running the tests
```
npm run test:unit
```

```
npm run test:e2e
```
### Running in DEV environment
```
npm run dev
```
### Running in PROD environment
```
npm start
```

## Additional Commands

### Running prisma studio
```bash
npm run db:studio
```

### Running migrate reset
```bash
npm run db:reset
```

### Running db push
```bash
npm run db:push
```

### Running migrate deploy
```bash
npm run db:migrate
```

### Running migration generation
```bash
npm run db:generate
```

## ToDo
- [ ] Seed file
- [ ] Docker build
    - [ ] Remove `start-database.sh` file
- [ ] Github action
    - [ ] Lints
    - [ ] Playwright and Vitest Tests
    - [ ] Deployment
