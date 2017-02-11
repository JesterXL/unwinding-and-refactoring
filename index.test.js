const log = console.log;
const should = require('chai').should();
const mod = require('./index');

describe('#basic mocha chai', ()=>
{
    it('should be true', ()=>
    {
        true.should.be.true;
    });
});
// describe('#person initial state', ()=>
// {
//     it('')
// });