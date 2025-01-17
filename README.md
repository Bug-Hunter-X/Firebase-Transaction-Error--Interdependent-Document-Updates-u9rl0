# Firebase Transaction Error: Interdependent Document Updates

This repository demonstrates a common error when using Firebase transactions to update multiple documents with interdependent conditions.  The problem arises from attempting to update documents concurrently where the update of one document relies on the current value of another.

The `bug.js` file showcases the faulty code, leading to inconsistent data or transaction failures. The `bugSolution.js` file provides a corrected implementation.

## Setup

1.  Ensure you have the Firebase JavaScript SDK installed: `npm install firebase`
2.  Configure your Firebase project and replace placeholders with your project configuration.

## Running the Code

Run the `bug.js` file to observe the problematic behavior.  Then, run `bugSolution.js` to see the corrected implementation.