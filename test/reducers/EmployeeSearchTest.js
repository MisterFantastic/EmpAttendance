var reducer = require('../../src/reducers/EmployeeSearch');

describe('EmployeeSearch', () => {

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
});
