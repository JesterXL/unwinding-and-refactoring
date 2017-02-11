const log = console.log;
const _ = require('lodash');
const should = require('chai').should();
describe('#basic mocha chai', ()=>
{
    it('should be true', ()=>
    {
        true.should.be.true;
    });
});