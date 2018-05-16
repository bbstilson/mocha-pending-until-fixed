# mocha-pending-until-fixed

Marks a mocha test as "pending until fixed", which skips if the test fails, but throws if the test succeeds.

This helper function is influenced by ScalaTest's `pendingUntilFixed`, so I will simply [quote them](http://doc.scalatest.org/1.7/org/scalatest/junit/JUnitSuite.html):

> This [function] can be used to temporarily change a failing test into a pending test in such a way that it will automatically turn back into a failing test once the problem originally causing the test to fail has been fixed. At that point, you need only remove the `pendingUntilFixed` call. In other words, a `pendingUntilFixed` surrounding a block of code that isn't broken is treated as a test failure. The motivation for this behavior is to encourage people to remove `pendingUntilFixed` calls when there are no longer needed.

## Installation

```
yarn add -D mocha-pending-until-fixed
```

or

```
npm i -D mocha-pending-until-fixed
```

## Usage

Simply wrap the _lowest level function_ in your mocha test callback with `pendingUntilFixed`:

```javascript
import pendingUntilFixed from 'mocha-pending-until-fixed';

describe('SomeFunction', () => {
  it('does a thing', pendingUntilFixed(() => {
    expect(false).to.be.true;
  }));
});
```
