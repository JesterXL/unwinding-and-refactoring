const _ = require('lodash');

const getRandomNumber = ()=> Math.random();
const getNotARandomNumber = ()=> 1;
const rollDice = (howMany, type, randomNumberFunction=getRandomNumber)=>
{
    var total = 0;
    for(var i=0;i<howMany;i++)
    {
        total += Math.round(randomNumberFunction() * type);
    }
    return total;
};
const attack = (rollDice, 
    randomNumberGenerator, 
    attackersStrength, 
    targetArmorBonus, 
    targetDexterity)=>
{
    let roll = rollDice(1, 20, randomNumberGenerator);
    roll += attackersStrength;
    roll = _.clamp(roll, 1, 20);
    const toHit = 10 + targetArmorBonus + targetDexterity;
    const hit = roll >= toHit;
    return {
        roll,
        hit,
        toHit
    };
};

class Person
{
    constructor(name, strength, dexterity, constitution, equipment)
    {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.hitPoints = 10 + constitution;
        this.equipment = equipment;
        this.calculateEquipment();
        this.armorBonus = 0;
    }

    static rollDice(howMany, type)
    {
        var total = 0;
        for(var i=0;i<howMany;i++)
        {
            total += Math.round(Math.random() * type);
        }
        return total;
    }

    attack(target)
    {
        var roll = Person.rollDice(1, 20);
        roll += this.strength;
        roll = _.clamp(roll, 1, 20);
        var toHit = 10 + target.armorBonus + target.dexterity;
        return roll >= toHit;
    }

    addEquipment(item)
    {
        this.equipment.push(item);
        if(item instanceof Armor)
        {
            this.calculateEquipment();
        }
    }

    removeEquipment(item)
    {
        for(var i=0; i<this.equipment.length; i++)
        {
            var e = this.equipment[i];
            if(e === item)
            {
                this.equipment.splice(i, 1);
            }
        }
        if(item instanceof Armor)
        {
            this.calculateEquipment();
        }
    }

    calculateEquipment()
    {
        this.armorBonus = 0;
        for(var i=0; i<this.equipment.length; i++)
        {
            var item = this.equipment[i];
            if(item instanceof Armor)
            {
                this.armorBonus += item.bonus;
            }
        }
    }
}

class Armor
{
    constructor(name, bonus)
    {
        this.name = name;
        this.bonus = bonus;
    }
}

class Weapon
{
    constructor(name, bonsu, damageDieAmount, damageDieType)
    {
        this.name = name;
        this.bonsu = bonsu;
        this.damageDieAmount = damageDieAmount;
        this.damageDieType = damageDieType;
    }
}

var person;

function setupPerson()
{
    var leatherArmor = new Armor("Leather", 2);
    var shortSword = new Weapon("Short Sword", 0, 1, 6)
    person = new Person('McFly Bojo', 2, 4, 1, [leatherArmor, shortSword]);
}

setupPerson();

getPerson = ()=> person;
module.exports = { 
    getPerson, 
    Person, 
    Armor, 
    Weapon,
    rollDice,
    getRandomNumber,
    getNotARandomNumber,
    attack
}