module.exports = function pendingUntilFixed(fn) {
  const message = 'Test passed while marked as pendingUntilFixed.';
  const errorSymbol = Symbol(message);

  return function() {
    try {
      const result = fn.apply(this, arguments);

      if (result instanceof Promise) {
        return result
          .then((res) => {
            // This flows into the catch block below, where it throws again for real.
            throw errorSymbol;
          }).catch((error) => {
            if (error === errorSymbol) {
              throw new Error(message);
            } else {
              this.skip();
            }
          });
      } else {
        // This flows into the catch block below, where it throws again for real.
        throw errorSymbol;
      }
    } catch(error) {
      if (error === errorSymbol) {
        throw new Error(message);
      } else {
        this.skip();
      }
    }
  }
}
