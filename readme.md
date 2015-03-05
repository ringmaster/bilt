# Bilt

Bilt is a tool that takes some common javascript libraries and a CSS framework and compiles them into a single javascript file that injects them all into a page.

The ultimate goal is to be able to add a single line like this to a page to have access to the entirety of the libraries:

`<script src="bilt.js"></script>`

## How to build

1. Clone the repo, then in the repo directory:
2. `npm install` - install the tool packages required to build
3. `gulp bower` - install the lib packages that are compiled
4. `gulp build` - build the project
5. `gulp compress` - build the project, compressed

