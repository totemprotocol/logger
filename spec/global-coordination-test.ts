import assert from 'assert';

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/camelcase */

describe('Global coordination between multiple instances of the module', function() {
  beforeEach(function() {
    delete require.cache[require.resolve('..')];
    delete (global as any).__global_cardstack_logger;
  });

  it("registers itself globally if it's the first loaded", function() {
    let loggerModule = require('..');
    assert.strictEqual(loggerModule, (global as any).__global_cardstack_logger);
  });

  it("uses an already-registered version", function() {
    (global as any).__global_cardstack_logger = {
      iAmFirst: true
    };

    let loggerModule = require('..');
    assert.deepEqual(loggerModule, { iAmFirst: true });
  });
});
