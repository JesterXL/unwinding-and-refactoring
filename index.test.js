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
describe("#index initial conditions", ()=>
{
    it('initial person is an object', ()=>
    {
        const person = getPerson();
        _.isObject(person).should.be.true;
    });
    it('armorBonus by default is 0 wearing leatherArmor', ()=>
    {
        const person = getPerson();
        person.armorBonus.should.equal(0);
        // FIXME: should be 2 by default using leatherArmor,
        // fix is to not reset armorBonus to 0
    });
    it('check rollDice', ()=>
    {
        const person = getPerson();
        log("person:", person);   
    });
});