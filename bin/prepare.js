#!/usr/bin/env node

'use strict'

/**
 * Node Modules 
 */
const fs = require("fs")
const { execSync } = require('child_process')

/**
 * Tasks 
 */

/**
 * Run NPM init 
 */
execSync('npm init -y')
console.log(`'npm init -y' command fired!`)
// working with package.json
const pkjPath = './package.json'
// check if package.json has been created
fs.access(pkjPath, fs.F_OK, (err) => {
  if (err) throw err
  // file exists
  console.log(`package.json - created!`)
})
// store package.json as obj
const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))

/**
 * Create .gitignore file 
 */
// prepare data
const gitIgnoreFile = '.gitignore'
const gitIgnoreContent = `# Ignored folders:
/node_modules

# Ignored files:
`
// create .gitignore fule
fs.writeFile(gitIgnoreFile, gitIgnoreContent, err => {
  if (err) throw err
  console.log(`${gitIgnoreFile} - created!`)
})
/**
 * README.md file 
 */
// prepare data
const ReadMeFile = 'README.md'
const title = json.name
// format author data from package.json
const author = json.author.split(' ').map((word, idx) => {
  if (idx === 4) word = '-'
  if (idx === 5) word = `[GitHub]${word}`
  return word
}).join(' ')
const license = json.license
const ReadMeFileContent = `# ${title}

> Work in progress !

### #TODO

* write a better README.md 

## Author

* ${author}

## Licence

* ${license}
`
// create README.md file
fs.writeFile(ReadMeFile, ReadMeFileContent, err => {
  if (err) throw err
  console.log(`${ReadMeFile} - created!`)
})
