# Compartilha

Compartilha is an open source project to [find institutions and social organizations](https://www.correiodopovo.com.br/correiomaisinterior/uniju%C3%AD-cria-plataforma-para-facilitar-doa%C3%A7%C3%B5es-a-entidades-1.436908) that need contributions to sustain themselves.

## This app was built with

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Hasura](https://img.shields.io/badge/Hasura-00315F?style=for-the-badge&logo=hasura&logoColor=#00315F)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Shell Script](https://img.shields.io/badge/Shell%20Script-0E141A?style=for-the-badge&logo=gnubash&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![GitHubActions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

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

### Managing front-end ([http://localhost:3000](http://localhost:3000))

The container `compartilha-app` with the front-end application already installs all dependencies, starts in development mode, and nothing else is needed to start development.

However, to install/uninstall packages directly from the container or run some command linked to Node.js/NPM or Git, you can enter it and manage as you prefer:

```bash
# to enter the container
docker exec -it compartilha-app bash

# now execute npm commands...

# to lint files from app
npm run lint -- --fix

# check outdated packages
npm outdated

# and most important, before commit, test the app to know if all is running fine
npm run build

# to see logs of `npm run dev`
docker logs -f compartilha-app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) (serverless functions) instead of React pages.

### Managing back-end ([http://localhost:9695/console](http://localhost:9695/console))

Most things already are automated by the Hasura Console, but to manage the back-end in some cases we will use Hasura CLI via the `compartilha-console` container.

To access Hasura Console open [http://localhost:9695/console](http://localhost:9695/console) in your browser. Everything you modify within the console will be reflected in the Hasura folder with its respective migrations and metadata, <u>**so be careful when making changes**</u>.

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

## How this project could be improved?

- [Cloudflare Workers](https://workers.cloudflare.com/) - Replacing Vercel's serverless APIs with Clouflare's Workers Edge platform, reducing cost and latency
- [Workers GraphQL Proxy](https://github.com/signalnerve/workers-graphql-proxy) - Using this proxy to:
  - Hide origin server and reduce latency between user and Hasura servers
  - Query/response caching at the edge (helping with unnecessary server and database calls)
  - Schema validation for incoming queries
  - Schema cache at the edge
- [AWS Fargate](https://aws.amazon.com/pt/fargate/) - Implementing Hasura in the AWS serverless computing for containers
- [Amazon RDS](https://aws.amazon.com/pt/rds/postgresql/) - Implementing the Postgres Database on AWS in multiple AZ (Availability Zone)
- [Hasura Terraform](https://registry.terraform.io/modules/Rayraegah/hasura/aws/latest) - Creating a Terraform module to deploy the apps like a IaaS in a scalable and fast way
