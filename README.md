# StartRocking

## Install dependencies

First install dependencies using:

```sh
npm install
```

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve start-rocking
```

To run the JSON Server, use:

```sh
npx json-server db.json
```

To create a production bundle:

```sh
npx nx build start-rocking
```

To run Playwright e2e tests (make sure JSON Server is running), use:

```sh
npx nx run e2e:e2e

// or with UI
npx nx run e2e:e2e --ui
```
