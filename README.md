# TL;DR

The minesweeper is running [https://ayc0.github.io/minesweeper/](here).

## Requirements

To run this project, you only need `node` and `npm`.
But it's highly recommended to use [yarn](https://yarnpkg.com).

## Installation

- Download: `git clone https://github.com/Ayc0/minesweeper.git`
- Install dependencies: `yarn install` (or `npm install`)

## Commands

- Run: `yarn start` (or `npm start`)
- Build in prod version: `yarn build` (or `npm run build`)

## Structure

The file `board.js` contains the logic of the game and the other files the visual.

Here is the structure and the dependencies between files :

```
index.js
  app.js (& app.css)
    levelPicker.js
      level.js (easy)
      level.js (medium)
      level.js (hard)
      level.js (custom)
   gameWrapper.js
     menu.js
       progress.js (min)
       progress.js (sec)
     minesweeper.js
       ../board.js (logic)
       tile.js (multiple)
```
