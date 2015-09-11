# Fiddus Client

Client side of Fiddus Project


## Development Environment Setup

To run this project you need to install some [Node](https://nodejs.org/en/) modules

```
    npm install -g grunt-cli karma mocha bower
```


## Usage

```
   git clone git@github.com:fiddus/client-template.git
   cd client-template
   npm install
   bower install
   serve
```


## Useful Commands

```
. ./project.sh
```

Now you have some command lines at your hands

Type `help` and press Enter to check the available commands



## Environment Variables

The following environment variables must be set in order to this app to work properly:

- NODE_ENV: should be set to `prod`, `dev` or `test`
- GITHUB_USERNAME: should be set to allow `grunt release` to work properly
- GITHUB_ACCESS_TOKEN: same as above


## Contributing

Before opening pull request, make sure that your new implementation is covered by unit tests and that the code adhere to
code style (run `grunt check` and `grunt test`).

Push to master should only occur at the end of the sprint.
