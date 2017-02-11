const log = console.log;
const _ = require('lodash');
const should = require('chai').should();
const {
    getPerson
} = require('./index');

describe('#basic mocha chai', ()=>
{
    it('should be true', ()=>
    {
        true.should.be.true;
    });
});
describe('#person initial state', ()=>
{
    it('getPerson should return a object', ()=>
    {
        const result = getPerson();
        _.isObject(result).should.be.true;
    });
    it('initial armor bonus is 0', ()=>
    {
        const result = getPerson();
        result.armorBonus.should.equal(0);
    });
});