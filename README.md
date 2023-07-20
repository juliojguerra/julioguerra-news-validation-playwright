# Technical Challenge - JP Morgan - Julio Guerra

## Introduction
Technical Challenge for the Software Developer in Test role at JP Morgan

## Tests
Application under test: [The Guardian](https://www.theguardian.com/tone/news)

Test: Confirm First News Article is valid

## Stack
- playwright: ^1.36.1
- typescript: ^5.1.6
- cucumber: ^9.3.0
- ts-node: ^10.9.1

## Installation
The project requires Node (recommended version 18.16.0)

1. Git clone this repository
2. In the main folder, run:

```
npm install
```

## Usage
1. Go to the main folder via console.
2. To execute tests via Playwright, execute `npm run test:pw`.
3. To execute tests via Cucumber, execute `npm run test`. 

Note: See more ways to execute tests in the package.json file

## Additional information 
### For non-technical staff:

📁 Cucumber Tests are located in /features folder

Note: Cucumber tests are easier to read.


### For technical staff:

📁 Tests are located in /tests folder

📁 Page Objects are located in /pageobjects folder


### All:

📁 Screenshots and videos are located in /playwright-report/data folder
