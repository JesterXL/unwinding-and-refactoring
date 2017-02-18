const log = console.log;
const _ = require('lodash');
const should = require('chai').should();
const {
    getPerson,
    Person,
    Armor,
    Weapon,
    getRandomNumber,
    rollDice,
    getNotARandomNumber,
    attack
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
});
describe('#Person', ()=>
{
    describe("#rollDice", ()=>
    {
        it("should return a finite number (not NaN nor Infinity)", ()=>
        {
            const number = Person.rollDice(1, 20);
            _.isFinite(number).should.be.true;
        });
        it("in a 10,000 sample size, we unfortunately get 0s", ()=>
        {
            const sample = new Array(10000);
            _.fill(sample, 0);
            const rollDiceSamples = _.map(sample, item => Person.rollDice(1, 20));
            const anyZeros = _.filter(rollDiceSamples, item => item === 0);
            anyZeros.length.should.not.equal(0);
        });
    });
    describe('#attack', ()=>
    {
        var personA;
        var personB;
        var createPersonFixture = (name)=>
        {
            var leatherArmor = new Armor("Leather", 2);
            var shortSword = new Weapon("Short Sword", 0, 1, 6)
            return new Person(name, 2, 4, 1, [leatherArmor, shortSword]);
        };
        beforeEach(()=>
        {
            personA = createPersonFixture('Person A');
            personB = createPersonFixture('Person B');
        });

        afterEach(()=>
        {
            personA = undefined;
            personB = undefined;
        });

        it("personA's hitpoints start at 11", ()=>
        {
            personA.hitPoints.should.equal(11);
        });
        it("personB's hitpoints start at 11", ()=>
        {
            personB.hitPoints.should.equal(11);
        });
        it("personA's armorBonus is 0 sadly", ()=>
        {
            personA.armorBonus.should.equal(0);
        });
        it("personB's armorBonus is 0 sadly", ()=>
        {
            personB.armorBonus.should.equal(0);
        });
        it("if I add a boomstick to my equipment, it's in the equipement array", ()=>
        {
            const boomStick = new Weapon('Boom Stick', 0, 1, 12);
            personA.addEquipment(boomStick);
            personA.equipment.should.include(boomStick);
        });
        it('if I add hotpants to PersonA, he becomes awessauce... and has an armorBonus of 3', ()=>
        {
            const hotPants = new Armor('Hawt Pawwwnts', 1);
            personA.addEquipment(hotPants);
            personA.armorBonus.should.equal(3);
        });
    });
});

describe('#getRandomNumber', ()=>
{
    it('should return a finite number', ()=>
    {
        const result = getRandomNumber();
        _.isFinite(result).should.be.true;
    });
});
describe('#rollDice', ()=>
{
    it('should return a finite number', ()=>
    {
        const result = rollDice(1, 20);
        _.isFinite(result).should.be.true;
    });
    it('should NOT be a random number of if we use 1', ()=>
    {
        const result = rollDice(1, 20, getNotARandomNumber);
        result.should.equal(20);
    });
});
describe('#getNotARandomNumber', ()=>
{
    it('should return a 1', ()=>
    {
        const result = getNotARandomNumber();
        result.should.equal(1);
    });
});
describe('#attack', ()=>
{
    it.only('should always be a hit if 20 is rolled', ()=>
    {
        const rollDice = ()=> 20;
        const result = attack(
            rollDice,
            getNotARandomNumber,
            0,
            0,
            0
        );
        result.hit.should.be.true;
    });
});

// const attack = (rollDice, 
//     randomNumberGenerator, 
//     attackersStrength, 
//     targetArmorBonus, 
//     targetDexterity)=>
// {
//     let roll = rollDice(1, 20, randomNumberGenerator);
//     roll += attackersStrength;
//     roll = _.clamp(roll, 1, 20);
//     const toHit = 10 + targetArmorBonus + targetDexterity;
//     return roll >= toHit;
// };