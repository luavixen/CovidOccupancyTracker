<h1 align="center">
CovidOccupancyTracker
</h1>
<p align="center"><i>
Webapp for tracking the number of people in a building, designed for a specific grocery store chain.
</i></p>

## Introduction
The CovidOccupancyTracker *\<COT\>* is a website that facilitates the accurate counting of the number of people currently in a building where every entrance/exit is staffed with someone like a "greeter".
All greeters can increase/decrease/set the number of people in the store, incrementing the number when somebody enters and decrementing the number when somebody leaves.
The changes are synced over the internet, allowing an accurate count even if someone were to enter from one door and leave out the other, or if greeters need to switch (shift change).

## Screenshots
TODO
![]()
![]()

## Technology
COT is written in [TypeScript](https://www.typescriptlang.org/), a superset of [JavaScript](https://wikipedia.org/wiki/JavaScript). It uses the [Vue.js](https://vuejs.org/) framework for rendering its user interface and the [Vuex](https://vuex.vuejs.org/) state management library for keeping track of program state. The internet syncing capabilities are powered by the [Google Firebase Firestore](https://firebase.google.com/) database, COT uses Firestore's snapshot listener features for automatic updating on all clients and the Firestore `FieldValue` system for atomic updates.

## Usage
TODO

## Contributing
No contributions are being accepted to this repository at this time.
However, please consider making a fork of this repository on GitHub if you wish to change something.

## Authors
Made with :heart: love by [Lua~](https://lua.wtf/)

## License
This project is licensed under [MIT](LICENSE).
More info in the [LICENSE](LICENSE) file.

*"A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source. There are many variations of this license in use."* - [tl;drLegal](https://tldrlegal.com/license/mit-license)
