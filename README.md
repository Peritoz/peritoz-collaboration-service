# Collaboration Service

This project provides an API to manage comments over any type of target object. 
You can use this service to manage collaboration between users over a variety of business domains, such as social media posts, documents, product reviews and more.

## Getting Started

Install all packages.

```bash
npm install
```

Create a .env.[ENVIRONMENT] file containing the database configuration, following the template below.

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=database_name
DATABASE_USER=your_user
DATABASE_PASS=your_pass
```

Start the service in development.

```bash
npm run start:dev
```

Generate a distribution to production. The build output will be available in ```$PROJECT_ROOT$/dist```.

```bash
npm run build
```