## nestjs-cqrs-starter

### Starn project:

- First step need start database; 

```bash
docker-compose up -d
```

- Copy ormconfig.example.json to ormconfig.json with your DB connection;
- Install dependencies;

```bash
npm i
```

- Install globally typeorm for use typorm cli;

```bash
sudo npm i typeorm -g
```

- For start project realtime 

```bash
npm run start:live
```

- For compile .ts to .js files to ./dist/ folder;

```bash
npm run prestart
```
- Then start nodejs;

```bash
npm start
```

### TODO:
- Exceptions;
- Validations;
- OAUTH;
- Write test;
- Config migration.
