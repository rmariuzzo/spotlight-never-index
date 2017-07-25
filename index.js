#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Get CLI arguments.
let [,,directory, pattern, flags] = process.argv

if (!directory) {
  console.error('Usage: spotlight-never-index <directory> [pattern]')
  return process.exit(1)
}

directory = path.resolve(__dirname, directory)

// If a pattern is provided, we want to traverse the given directory,
// otherwise we just take a shortcut and make the given directory no
// indexable by Spotlight.
if (pattern) {
  pattern = new RegExp(pattern, flags)
  traverse(directory)
} else {
  neverIndex(directory)
}

/**
 * Traverse a directory looking for more directories.
 * @param {String} directory The directory.
 */
function traverse(directory) {
  const directories = findDirectories(directory)
  const [matched, unmatched] = partition(directories, (directory) => directory.match(pattern))
  matched.forEach((m) => neverIndex(path.join(directory, m)))
  unmatched.forEach((u) => traverse(path.join(directory, u)))
}

/**
 * Return directories in a directory.
 * @param {String} directory The directory.
 */
function findDirectories(directory) {
  const entries = fs.readdirSync(directory)
  const directories = entries.filter((entry) => fs.lstatSync(path.join(directory, entry)).isDirectory())
  return directories
}

/**
 * Return an array with elements that matched a condition, and also those that didn't.
 * @param {Array} array The array.
 * @param {Function} cb The callback.
 * @return {Array} An array
 */
function partition(array, cb) {
  const matched = []
  const unmatched = []
  array.forEach((element) => {
    (cb(element) ? matched : unmatched).push(element)
  })
  return [matched, unmatched]
}

/**
 * Make a directory no indexable by Spotlight.
 * @param {String} directory The directory.
 */
function neverIndex(directory) {
  const file = path.join(directory, '.metadata_never_index')
  fs.openSync(file, 'w')
  console.log(`Created: ${file}`)
}
