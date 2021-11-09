# [Compartilha.org](https://compartilha.org)

[Compartilha.org](https://compartilha.org) is an open source project to find institutions and social organizations that need contributions to sustain themselves.

## How to contribute to development

### Starting project

Starting the project with Docker will up 4 applications:

- **Front-end (Next.js App)**: compartilha-app
- **Back-end (GraphQL Engine)**: compartilha-hasura
- **Console (Hasura CLI)**: compartilha-console
- **Postgres (Database)**: compartilha-postgres

```bash
# first thing of all, copy .env.example file
cp .env.example .env

# start all apps
docker-compose up -d

# rebuild apps without delete any data
docker-compose up -d --build -V

# delete all apps as well as their volumes (deleting data)
docker-compose down -v --remove-orphans
```

### Managing front-end

The container `compartilha-app` with the front-end application already installs all dependencies, starts in development mode, and nothing else is needed to start development.

However, to install/uninstall packages directly from the container or run some command linked to Node.js/NPM or Git, you can enter it and manage as you prefer:

```bash
# to enter the container
docker exec -it compartilha-app bash

# now execute npm commands...

# to lint app
npm run lint

# ckeck outdated packates
npm outdated

# and most important, before commit, test the app to know if all is running fine
npm run build

# to see logs of `npm run dev`
docker logs -f compartilha-app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) (serverless functions) instead of React pages.

### Managing back-end

Most things already are automated by the Hasura Console, but to manage the back-end in some cases we will use Hasura CLI via the `compartilha-console` container:

```bash
# to enter the container
docker exec -it compartilha-console bash

# and some useful commands to manage Hasura...

# apply or remove only one database migration
hasura migrate apply --version 1636141954665 --type up
hasura migrate apply --version 1636141954665 --type down

# rollback some migration
hasura migrate apply --goto 1636141954665

# merge all migrations into one
hasura migrate squash --name "some description" --from 1636141954665
hasura migrate apply --skip-execution --version 1636141954665 # after that, skip migration execution because it has already been applied

# get hasura migration status to know if all migrations are ok
hasura migrate status

# for more commands check the hasura cli documentation.
```

## Frameworks documentations

To learn more about the frameworks, take a look at the following documentations:

- [Hasura GraphQL Engine](https://hasura.io/docs/latest/graphql/core/index.html) - Hasura engine makes your data instantly accessible over a real-time GraphQL API
- [Next.js](https://nextjs.org/docs) - Next.js gives you the best developer experience with all the features you need for production
- [React](https://reactjs.org/docs/getting-started.html) - A JavaScript library for building user interfaces
- [TailwindCSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML
