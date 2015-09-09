# Case4You Client

Client side of Case4You Project

## Environment Setup

```
    npm install -g grunt-cli karma mocha bower
```

## Using:

```
   git clone git@github.com:fiddus/case4you-client.git
   cd case4you-client
   . ./project.sh
   npm install
   bower install
   serve
```

## Environment Variables

The following environment variables must be set in order to this app to work properly:

- NODE_ENV: should be set to `prod`, `dev` or `test`

## Contributing

Before opening pull request, make sure that your new implementation is covered by unit tests and that the code adhere to
code style (run `grunt check` and `grunt test`).

Push to master should only occur at the end of the sprint.
