# Money Snapshots

A simple, single-page JavaScript application for recording 'snapshots' of account balances over
time. Users can configure the accounts they want to track. Application data and configuration are
written to a JSON file.

## Project goals

- Simple to develop: Avoid requiring Node/NPM/Webpack/etc for development.
- Simple to run: Application is packaged into one file, which can be run locally offline.
- Straightforward deployment: A single command to compile and package code.

## Development

The application is written in ES6 using the [Mithril](https://mithril.js.org) framework.

**Note:** The application uses ES6 modules; your browser likely prevents loading locally hosted Javscript files or modules. To develop and test locally, you can use Docker to serve the files locally at `localhost:8080`:

```
docker run -d -p 8080:80 \
--name money_snapshots \
--volume "$(pwd)":/usr/share/nginx/html \
nginx:latest
```

And to stop the container:

```
docker stop money_snapshots
```