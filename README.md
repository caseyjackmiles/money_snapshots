# Money Snapshots

A simple, single-page JavaScript application for recording 'snapshots' of account balances over
time. Users can configure the accounts they want to track. Application data and configuration are
written to a JSON file.

## Project goals

- Simple to develop: Avoid requiring Docker/Node/NPM/Webpack/etc for development.
- Simple to run: Application is packaged into one file, which can be run locally offline.
- Straightforward deployment: A single command to compile and package code.

## Development

The application is written in ES6 using the [Mithril](https://mithril.js.org) framework.
The only requirement for development is a browser that supports the ES6 features used.

**Note:** Your browser likely prevents loading local JavaScript files. To develop locally,
you can temporarily disable unique origins for `file://` resources. Just make sure to
return the setting to default when not developing.
- Firefox: `privacy.file_unique_origin : false`
