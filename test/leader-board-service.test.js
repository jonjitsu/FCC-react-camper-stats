import { assert } from 'chai';
// import Promise from 'bluebird';

const is = assert.strictEqual,
      fixture = f => {
          return require(f);
      },
      mockAjax = {
          getJSON() {}
      },
      baseUrl = '',
      service = require('../src/leader-board-service.js')(baseUrl, mockAjax);

describe('leader-board-service', ()=>{
    it('can get all stats', (done)=>{
        let expected = {
            '/api/fccusers/top/recent': fixture('./fixtures/recent1.json'),
            '/api/fccusers/top/alltime': fixture('./fixtures/alltime1.json')
        }, errorHandler = error=>{
            console.log('Error is: ' + error);
            done(error);
        };
        mockAjax.getJSON = url => {
            assert(expected[url]!==undefined);
            const data = expected[url];
            delete expected[url];
            return Promise.resolve(data);
        };

        debugger;
        service.all().then(data=>{
            let expected = fixture('./fixtures/expected-all1.json');
            assert.deepEqual(expected, data);
            done();
        }).catch(errorHandler);
        is(Object.keys(expected).length, 0);
    });
});
