// Definição das classes e estruturas de dados
class Pokemon {
    constructor(name, type, hp, level, moves) {
        this.name = name;
        this.type = type;
        this.maxHp = hp;
        this.currentHp = hp;
        this.level = level;
        this.moves = moves;
    }
    
    attack(moveIndex, target) {
        const move = this.moves[moveIndex];
        const damage = this.calculateDamage(move, target);
        
        if (damage < 0) {
            // Healing move - apply to self
            this.heal(-damage); // Negative damage means healing
            return {
                moveName: move.name,
                damage: damage,
                healing: true
            };
        } else {
            // Damaging move - apply to target
            target.takeDamage(damage);
            return {
                moveName: move.name,
                damage: damage,
                healing: false
            };
        }
    }
    
    calculateDamage(move, target) {
        // Factor in accuracy
        if (Math.random() * 100 > move.accuracy) {
            return 0; // Miss
        }
        
        // Healing moves
        if (move.power === 0 && ["Recover", "Moonlight", "Roost", "Soft-Boiled", "Rest", "Slack Off", "Synthesis"].includes(move.name)) {
            // Return negative damage to indicate healing
            return -Math.floor(this.maxHp * 0.35);
        }
        
        // Basic damage factor
        let damage = move.power * (this.level / 100) * 2;
        
        // Type effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, target.type);
        damage *= effectiveness;
        
        // Add some randomness (85% to 100% of calculated damage)
        damage *= (0.85 + Math.random() * 0.15);
        
        return Math.floor(damage);
    }
    
    getTypeEffectiveness(moveType, targetType) {
        const typeChart = {
            water: { fire: 2, grass: 0.5, water: 0.5, electric: 1, normal: 1 },
            fire: { grass: 2, water: 0.5, fire: 0.5, electric: 1, normal: 1 },
            grass: { water: 2, fire: 0.5, grass: 0.5, electric: 1, normal: 1 },
            electric: { water: 2, grass: 0.5, fire: 1, electric: 0.5, normal: 1 },
            normal: { water: 1, fire: 1, grass: 1, electric: 1, normal: 1 }
        };
        
        return typeChart[moveType][targetType];
    }
    
    takeDamage(amount) {
        this.currentHp = Math.max(0, this.currentHp - amount);
        return this.currentHp;
    }
    
    heal(amount) {
        this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
        return this.currentHp;
    }
    
    isFainted() {
        return this.currentHp <= 0;
    }
}

class Move {
    constructor(name, type, power, accuracy) {
        this.name = name;
        this.type = type;
        this.power = power;
        this.accuracy = accuracy || 100;
    }
}

// Expanded pokemonDatabase with all available Pokémon in alphabetical order
const pokemonDatabase = {
    aerodactyl: {
        name: "Aerodactyl",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Wing Attack", "normal", 60, 100),
            new Move("Rock Slide", "normal", 75, 90),
            new Move("Crunch", "normal", 80, 100),
            new Move("Sky Drop", "normal", 60, 100)
        ]
    },
    aggron: {
        name: "Aggron",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Iron Tail", "normal", 100, 75),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Metal Burst", "normal", 0, 100)
        ]
    },
    alakazam: {
        name: "Alakazam",
        type: "normal",
        hp: 120,
        level: 50,
        moves: [
            new Move("Psychic", "normal", 90, 100),
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Energy Ball", "normal", 90, 100),
            new Move("Recover", "normal", 0, 100)
        ]
    },
    arceus: {
        name: "Arceus",
        type: "normal",
        hp: 180,
        level: 50,
        moves: [
            new Move("Judgment", "normal", 100, 100),
            new Move("Extreme Speed", "normal", 80, 100),
            new Move("Recover", "normal", 0, 100),
            new Move("Earthquake", "normal", 100, 100)
        ]
    },
    armaldo: {
        name: "Armaldo",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("X-Scissor", "normal", 80, 100),
            new Move("Rock Blast", "normal", 25, 90),
            new Move("Aqua Jet", "normal", 40, 100),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    bastiodon: {
        name: "Bastiodon",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Iron Head", "normal", 80, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Protect", "normal", 0, 100)
        ]
    },
    blastoise: {
        name: "Blastoise",
        type: "water",
        hp: 145,
        level: 50,
        moves: [
            new Move("Hydro Pump", "water", 110, 80),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Protect", "normal", 0, 100)
        ]
    },
    blaziken: {
        name: "Blaziken",
        type: "fire",
        hp: 150,
        level: 50,
        moves: [
            new Move("Blaze Kick", "fire", 85, 90),
            new Move("Sky Uppercut", "normal", 85, 90),
            new Move("Flare Blitz", "fire", 120, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    carracosta: {
        name: "Carracosta",
        type: "water",
        hp: 155,
        level: 50,
        moves: [
            new Move("Aqua Tail", "water", 90, 90),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Shell Smash", "normal", 0, 100),
            new Move("Waterfall", "water", 80, 100)
        ]
    },
    charizard: {
        name: "Charizard",
        type: "fire",
        hp: 150,
        level: 50,
        moves: [
            new Move("Flamethrower", "fire", 90, 100),
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Air Slash", "normal", 75, 95),
            new Move("Solar Beam", "grass", 120, 100)
        ]
    },
    claydol: {
        name: "Claydol",
        type: "normal",
        hp: 140,
        level: 50,
        moves: [
            new Move("Earth Power", "normal", 90, 100),
            new Move("Psychic", "normal", 90, 100),
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Rapid Spin", "normal", 20, 100)
        ]
    },
    conkeldurr: {
        name: "Conkeldurr",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Hammer Arm", "normal", 100, 90),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Bulk Up", "normal", 0, 100),
            new Move("Drain Punch", "normal", 75, 100)
        ]
    },
    cresselia: {
        name: "Cresselia",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Moonblast", "normal", 95, 100),
            new Move("Psychic", "normal", 90, 100),
            new Move("Calm Mind", "normal", 0, 100),
            new Move("Moonlight", "normal", 0, 100)
        ]
    },
    darkrai: {
        name: "Darkrai",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Dark Pulse", "normal", 80, 100),
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Hypnosis", "normal", 0, 60),
            new Move("Dream Eater", "normal", 100, 100)
        ]
    },
    donphan: {
        name: "Donphan",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Rapid Spin", "normal", 20, 100),
            new Move("Knock Off", "normal", 65, 100)
        ]
    },
    dragonite: {
        name: "Dragonite",
        type: "normal",
        hp: 170,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Hurricane", "normal", 110, 70),
            new Move("Thunder Punch", "electric", 75, 100),
            new Move("Roost", "normal", 0, 100)
        ]
    },
    druddigon: {
        name: "Druddigon",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Crunch", "normal", 80, 100),
            new Move("Rock Slide", "normal", 75, 90),
            new Move("Glare", "normal", 0, 100)
        ]
    },
    dusknoir: {
        name: "Dusknoir",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Shadow Punch", "normal", 60, 100),
            new Move("Will-O-Wisp", "normal", 0, 85),
            new Move("Pain Split", "normal", 0, 100),
            new Move("Earthquake", "normal", 100, 100)
        ]
    },
    eelektross: {
        name: "Eelektross",
        type: "electric",
        hp: 155,
        level: 50,
        moves: [
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Flamethrower", "fire", 90, 100),
            new Move("Giga Drain", "grass", 75, 100),
            new Move("Acid Spray", "normal", 40, 100)
        ]
    },
    electivire: {
        name: "Electivire",
        type: "electric",
        hp: 150,
        level: 50,
        moves: [
            new Move("Thunder Punch", "electric", 75, 100),
            new Move("Ice Punch", "normal", 75, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Cross Chop", "normal", 100, 80)
        ]
    },
    emboar: {
        name: "Emboar",
        type: "fire",
        hp: 160,
        level: 50,
        moves: [
            new Move("Flare Blitz", "fire", 120, 100),
            new Move("Hammer Arm", "normal", 100, 90),
            new Move("Wild Charge", "electric", 90, 100),
            new Move("Head Smash", "normal", 150, 80)
        ]
    },
    excadrill: {
        name: "Excadrill",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Earthquake", "normal", 100, 100),
            new Move("Iron Head", "normal", 80, 100),
            new Move("Rock Slide", "normal", 75, 90),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    flygon: {
        name: "Flygon",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Fire Punch", "fire", 75, 100),
            new Move("U-turn", "normal", 70, 100)
        ]
    },
    gallade: {
        name: "Gallade",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Psycho Cut", "normal", 70, 100),
            new Move("Close Combat", "normal", 120, 100),
            new Move("Leaf Blade", "grass", 90, 100),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    garchomp: {
        name: "Garchomp",
        type: "normal",
        hp: 170,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    gardevoir: {
        name: "Gardevoir",
        type: "normal",
        hp: 140,
        level: 50,
        moves: [
            new Move("Psychic", "normal", 90, 100),
            new Move("Moonblast", "normal", 95, 100),
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Calm Mind", "normal", 0, 100)
        ]
    },
    gengar: {
        name: "Gengar",
        type: "normal",
        hp: 135,
        level: 50,
        moves: [
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Sludge Bomb", "normal", 90, 100),
            new Move("Thunderbolt", "normal", 90, 100),
            new Move("Focus Blast", "normal", 120, 70)
        ]
    },
    gigalith: {
        name: "Gigalith",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Iron Head", "normal", 80, 100),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    golem: {
        name: "Golem",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Explosion", "normal", 250, 100),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    gyarados: {
        name: "Gyarados",
        type: "water",
        hp: 160,
        level: 50,
        moves: [
            new Move("Waterfall", "water", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Ice Fang", "normal", 65, 95),
            new Move("Dragon Dance", "normal", 0, 100)
        ]
    },
    hariyama: {
        name: "Hariyama",
        type: "normal",
        hp: 175,
        level: 50,
        moves: [
            new Move("Close Combat", "normal", 120, 100),
            new Move("Knock Off", "normal", 65, 100),
            new Move("Bullet Punch", "normal", 40, 100),
            new Move("Whirlwind", "normal", 0, 100)
        ]
    },
    haxorus: {
        name: "Haxorus",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Poison Jab", "normal", 80, 100),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    heatran: {
        name: "Heatran",
        type: "fire",
        hp: 155,
        level: 50,
        moves: [
            new Move("Lava Plume", "fire", 80, 100),
            new Move("Earth Power", "normal", 90, 100),
            new Move("Flash Cannon", "normal", 80, 100),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    hitmonchan: {
        name: "Hitmonchan",
        type: "normal",
        hp: 135,
        level: 50,
        moves: [
            new Move("Mach Punch", "normal", 40, 100),
            new Move("Ice Punch", "normal", 75, 100),
            new Move("Thunder Punch", "electric", 75, 100),
            new Move("Close Combat", "normal", 120, 100)
        ]
    },
    hitmonlee: {
        name: "Hitmonlee",
        type: "normal",
        hp: 135,
        level: 50,
        moves: [
            new Move("High Jump Kick", "normal", 130, 90),
            new Move("Blaze Kick", "fire", 85, 90),
            new Move("Knock Off", "normal", 65, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    jirachi: {
        name: "Jirachi",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Iron Head", "normal", 80, 100),
            new Move("Doom Desire", "normal", 140, 100),
            new Move("Psychic", "normal", 90, 100),
            new Move("Wish", "normal", 0, 100)
        ]
    },
    krookodile: {
        name: "Krookodile",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Earthquake", "normal", 100, 100),
            new Move("Crunch", "normal", 80, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Dragon Claw", "normal", 80, 100)
        ]
    },
    kyogre: {
        name: "Kyogre",
        type: "water",
        hp: 175,
        level: 50,
        moves: [
            new Move("Water Spout", "water", 150, 100),
            new Move("Thunder", "electric", 110, 70),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Calm Mind", "normal", 0, 100)
        ]
    },
    kyurem: {
        name: "Kyurem",
        type: "normal",
        hp: 170,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Earth Power", "normal", 90, 100),
            new Move("Outrage", "normal", 120, 100)
        ]
    },
    lapras: {
        name: "Lapras",
        type: "water",
        hp: 165,
        level: 50,
        moves: [
            new Move("Surf", "water", 90, 100),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Sing", "normal", 0, 55)
        ]
    },
    latios: {
        name: "Latios",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Dragon Pulse", "normal", 85, 100),
            new Move("Psychic", "normal", 90, 100),
            new Move("Energy Ball", "grass", 90, 100),
            new Move("Recover", "normal", 0, 100)
        ]
    },
    lopunny: {
        name: "Lopunny",
        type: "normal",
        hp: 135,
        level: 50,
        moves: [
            new Move("Return", "normal", 102, 100),
            new Move("High Jump Kick", "normal", 130, 90),
            new Move("Ice Punch", "normal", 75, 100),
            new Move("Healing Wish", "normal", 0, 100)
        ]
    },
    lucario: {
        name: "Lucario",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Aura Sphere", "normal", 80, 100),
            new Move("Close Combat", "normal", 120, 100),
            new Move("Extreme Speed", "normal", 80, 100),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    lugia: {
        name: "Lugia",
        type: "normal",
        hp: 175,
        level: 50,
        moves: [
            new Move("Aeroblast", "normal", 100, 95),
            new Move("Calm Mind", "normal", 0, 100),
            new Move("Recover", "normal", 0, 100),
            new Move("Whirlwind", "normal", 0, 100)
        ]
    },
    machamp: {
        name: "Machamp",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("Dynamic Punch", "normal", 100, 50),
            new Move("Cross Chop", "normal", 100, 80),
            new Move("Knock Off", "normal", 65, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    magmortar: {
        name: "Magmortar",
        type: "fire",
        hp: 145,
        level: 50,
        moves: [
            new Move("Flamethrower", "fire", 90, 100),
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Focus Blast", "normal", 120, 70),
            new Move("Solar Beam", "grass", 120, 100)
        ]
    },
    mamoswine: {
        name: "Mamoswine",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Earthquake", "normal", 100, 100),
            new Move("Ice Shard", "normal", 40, 100),
            new Move("Icicle Crash", "normal", 85, 90),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    medicham: {
        name: "Medicham",
        type: "normal",
        hp: 130,
        level: 50,
        moves: [
            new Move("High Jump Kick", "normal", 130, 90),
            new Move("Psycho Cut", "normal", 70, 100),
            new Move("Thunder Punch", "electric", 75, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    metagross: {
        name: "Metagross",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Meteor Mash", "normal", 90, 90),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Zen Headbutt", "normal", 80, 90),
            new Move("Agility", "normal", 0, 100)
        ]
    },
    mew: {
        name: "Mew",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Psychic", "normal", 90, 100),
            new Move("Aura Sphere", "normal", 80, 100),
            new Move("Soft-Boiled", "normal", 0, 100),
            new Move("Transform", "normal", 0, 100)
        ]
    },
    mewtwo: {
        name: "Mewtwo",
        type: "normal",
        hp: 175,
        level: 50,
        moves: [
            new Move("Psychic", "normal", 90, 100),
            new Move("Aura Sphere", "normal", 80, 100),
            new Move("Shadow Ball", "normal", 80, 100),
            new Move("Recover", "normal", 0, 100)
        ]
    },
    palkia: {
        name: "Palkia",
        type: "water",
        hp: 170,
        level: 50,
        moves: [
            new Move("Spacial Rend", "normal", 100, 95),
            new Move("Hydro Pump", "water", 110, 80),
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Earth Power", "normal", 90, 100)
        ]
    },
    pikachu: {
        name: "Pikachu",
        type: "electric",
        hp: 110,
        level: 50,
        moves: [
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Quick Attack", "normal", 40, 100),
            new Move("Iron Tail", "normal", 100, 75),
            new Move("Volt Tackle", "electric", 120, 100)
        ]
    },
    primeape: {
        name: "Primeape",
        type: "normal",
        hp: 140,
        level: 50,
        moves: [
            new Move("Close Combat", "normal", 120, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("U-turn", "normal", 70, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    rampardos: {
        name: "Rampardos",
        type: "normal",
        hp: 155,
        level: 50,
        moves: [
            new Move("Head Smash", "normal", 150, 80),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Zen Headbutt", "normal", 80, 90),
            new Move("Rock Polish", "normal", 0, 100)
        ]
    },
    rayquaza: {
        name: "Rayquaza",
        type: "normal",
        hp: 175,
        level: 50,
        moves: [
            new Move("Dragon Ascent", "normal", 120, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Extreme Speed", "normal", 80, 100),
            new Move("Dragon Dance", "normal", 0, 100)
        ]
    },
    regice: {
        name: "Regice",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Thunderbolt", "electric", 90, 100),
            new Move("Focus Blast", "normal", 120, 70),
            new Move("Amnesia", "normal", 0, 100)
        ]
    },
    regirock: {
        name: "Regirock",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Hammer Arm", "normal", 100, 90),
            new Move("Curse", "normal", 0, 100)
        ]
    },
    registeel: {
        name: "Registeel",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Iron Head", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Flash Cannon", "normal", 80, 100),
            new Move("Thunder Wave", "normal", 0, 100)
        ]
    },
    reshiram: {
        name: "Reshiram",
        type: "fire",
        hp: 170,
        level: 50,
        moves: [
            new Move("Blue Flare", "fire", 130, 85),
            new Move("Dragon Pulse", "normal", 85, 100),
            new Move("Earth Power", "normal", 90, 100),
            new Move("Fusion Flare", "fire", 100, 100)
        ]
    },
    rhyperior: {
        name: "Rhyperior",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Megahorn", "normal", 120, 85),
            new Move("Rock Wrecker", "normal", 150, 90)
        ]
    },
    salamence: {
        name: "Salamence",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Fire Blast", "fire", 110, 85),
            new Move("Dragon Dance", "normal", 0, 100)
        ]
    },
    sawk: {
        name: "Sawk",
        type: "normal",
        hp: 140,
        level: 50,
        moves: [
            new Move("Close Combat", "normal", 120, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Poison Jab", "normal", 80, 100),
            new Move("Bulk Up", "normal", 0, 100)
        ]
    },
    sceptile: {
        name: "Sceptile",
        type: "grass",
        hp: 145,
        level: 50,
        moves: [
            new Move("Leaf Blade", "grass", 90, 100),
            new Move("Dragon Pulse", "normal", 85, 100),
            new Move("Focus Blast", "normal", 120, 70),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    scizor: {
        name: "Scizor",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Bullet Punch", "normal", 40, 100),
            new Move("X-Scissor", "normal", 80, 100),
            new Move("Swords Dance", "normal", 0, 100),
            new Move("Roost", "normal", 0, 100)
        ]
    },
    sharpedo: {
        name: "Sharpedo",
        type: "water",
        hp: 140,
        level: 50,
        moves: [
            new Move("Crunch", "normal", 80, 100),
            new Move("Waterfall", "water", 80, 100),
            new Move("Ice Fang", "normal", 65, 95),
            new Move("Protect", "normal", 0, 100)
        ]
    },
    shiftry: {
        name: "Shiftry",
        type: "grass",
        hp: 145,
        level: 50,
        moves: [
            new Move("Leaf Blade", "grass", 90, 100),
            new Move("Sucker Punch", "normal", 80, 100),
            new Move("Dark Pulse", "normal", 80, 100),
            new Move("Nasty Plot", "normal", 0, 100)
        ]
    },
    slowbro: {
        name: "Slowbro",
        type: "water",
        hp: 150,
        level: 50,
        moves: [
            new Move("Scald", "water", 80, 100),
            new Move("Psychic", "normal", 90, 100),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Slack Off", "normal", 0, 100)
        ]
    },
    snorlax: {
        name: "Snorlax",
        type: "normal",
        hp: 180,
        level: 50,
        moves: [
            new Move("Body Slam", "normal", 85, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Crunch", "normal", 80, 100),
            new Move("Rest", "normal", 0, 100)
        ]
    },
    steelix: {
        name: "Steelix",
        type: "normal",
        hp: 160,
        level: 50,
        moves: [
            new Move("Iron Tail", "normal", 100, 75),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    swampert: {
        name: "Swampert",
        type: "water",
        hp: 155,
        level: 50,
        moves: [
            new Move("Muddy Water", "water", 90, 85),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Stealth Rock", "normal", 0, 100)
        ]
    },
    throh: {
        name: "Throh",
        type: "normal",
        hp: 145,
        level: 50,
        moves: [
            new Move("Circle Throw", "normal", 60, 90),
            new Move("Bulk Up", "normal", 0, 100),
            new Move("Storm Throw", "normal", 60, 100),
            new Move("Rest", "normal", 0, 100)
        ]
    },
    torterra: {
        name: "Torterra",
        type: "grass",
        hp: 160,
        level: 50,
        moves: [
            new Move("Wood Hammer", "grass", 120, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Synthesis", "normal", 0, 100)
        ]
    },
    typhlosion: {
        name: "Typhlosion",
        type: "fire",
        hp: 150,
        level: 50,
        moves: [
            new Move("Eruption", "fire", 150, 100),
            new Move("Flamethrower", "fire", 90, 100),
            new Move("Focus Blast", "normal", 120, 70),
            new Move("Solar Beam", "grass", 120, 100)
        ]
    },
    tyranitar: {
        name: "Tyranitar",
        type: "normal",
        hp: 165,
        level: 50,
        moves: [
            new Move("Stone Edge", "normal", 100, 80),
            new Move("Crunch", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Dragon Dance", "normal", 0, 100)
        ]
    },
    ursaring: {
        name: "Ursaring",
        type: "normal",
        hp: 150,
        level: 50,
        moves: [
            new Move("Return", "normal", 102, 100),
            new Move("Close Combat", "normal", 120, 100),
            new Move("Crunch", "normal", 80, 100),
            new Move("Swords Dance", "normal", 0, 100)
        ]
    },
    vaporeon: {
        name: "Vaporeon",
        type: "water",
        hp: 150,
        level: 50,
        moves: [
            new Move("Hydro Pump", "water", 110, 80),
            new Move("Ice Beam", "normal", 90, 100),
            new Move("Wish", "normal", 0, 100),
            new Move("Protect", "normal", 0, 100)
        ]
    },
    venusaur: {
        name: "Venusaur",
        type: "grass",
        hp: 140,
        level: 50,
        moves: [
            new Move("Solar Beam", "grass", 120, 100),
            new Move("Sludge Bomb", "normal", 90, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Synthesis", "normal", 0, 100)
        ]
    },
    zekrom: {
        name: "Zekrom",
        type: "electric",
        hp: 170,
        level: 50,
        moves: [
            new Move("Bolt Strike", "electric", 130, 85),
            new Move("Dragon Claw", "normal", 80, 100),
            new Move("Earthquake", "normal", 100, 100),
            new Move("Hone Claws", "normal", 0, 100)
        ]
    }
};

// Variáveis de estado do jogo
let playerTeam = []; // Array de Pokémon do jogador
let activePlayerPokemon = null; // Pokémon ativo do jogador
let enemyTeam = []; // Array de Pokémon inimigos
let activeEnemyPokemon = null; // Pokémon ativo do inimigo
let gameState = "selection"; // selection, battle, gameOver
let turnState = "playerTurn"; // playerTurn, enemyTurn, switching, animating

// Elementos DOM
const battleContainer = document.querySelector(".battle-container");
const selectionScreen = document.getElementById("selection-screen");
const gameOverScreen = document.getElementById("game-over");
const pokemonOptions = document.querySelectorAll(".pokemon-option");
const startBattleBtn = document.getElementById("start-battle");
const playAgainBtn = document.getElementById("play-again");

const playerNameEl = document.getElementById("player-name");
const playerLevelEl = document.getElementById("player-level");
const playerHpEl = document.getElementById("player-hp");
const playerHpNumberEl = document.getElementById("player-hp-number");
const playerSpriteEl = document.getElementById("player-sprite");

const enemyNameEl = document.getElementById("enemy-name");
const enemyLevelEl = document.getElementById("enemy-level");
const enemyHpEl = document.getElementById("enemy-hp");
const enemyHpNumberEl = document.getElementById("enemy-hp-number");
const enemySpriteEl = document.getElementById("enemy-sprite");

const messageBoxEl = document.getElementById("message-box");
const mainMenuEl = document.getElementById("main-menu");
const attackMenuEl = document.getElementById("attack-menu");
const fightBtn = document.getElementById("fight-btn");
const pokemonBtn = document.getElementById("pokemon-btn");
const itemBtn = document.getElementById("item-btn");
const runBtn = document.getElementById("run-btn");
const attackBtns = [
    document.getElementById("attack-1"),
    document.getElementById("attack-2"),
    document.getElementById("attack-3"),
    document.getElementById("attack-4")
];

const pokemonSwitchMenu = document.getElementById("pokemon-switch-menu");
const teamSlotsContainer = document.getElementById("team-slots");
const selectionContainer = document.querySelector(".pokemon-selection");

// Inicialização do jogo
function initGame() {
    createPokemonSelection();
    createTeamSlots();

    // Configurar eventos da tela de seleção
    startBattleBtn.addEventListener("click", startBattle);
    playAgainBtn.addEventListener("click", resetGame);

    // Configurar eventos dos menus de batalha
    fightBtn.addEventListener("click", () => {
        mainMenuEl.style.display = "none";
        attackMenuEl.style.display = "grid";
    });

    pokemonBtn.addEventListener("click", () => {
        mainMenuEl.style.display = "none";
        pokemonSwitchMenu.style.display = "grid";
        updatePokemonSwitchMenu();
    });

    itemBtn.addEventListener("click", () => {
        displayMessage("Você não tem itens para usar!");
    });

    runBtn.addEventListener("click", () => {
        resetGame();
    });

    attackBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (turnState === "playerTurn") {
                executePlayerTurn(index);
            }
        });
    });
}

function createPokemonSelection() {
    selectionContainer.innerHTML = "";
    Object.keys(pokemonDatabase).forEach(pokemonKey => {
        const pokemon = pokemonDatabase[pokemonKey];
        const option = document.createElement("div");
        option.className = "pokemon-option";
        option.dataset.pokemon = pokemonKey;

        option.innerHTML = `
            <div class="pokemon-preview ${pokemonKey}"></div>
            <div class="pokemon-name">${pokemon.name}</div>
        `;

        option.addEventListener("click", () => {
            if (playerTeam.length < 6 && !playerTeam.some(p => p.name === pokemon.name)) {
                addPokemonToTeam(pokemonKey);
            }
        });

        selectionContainer.appendChild(option);
    });
}

function createTeamSlots() {
    teamSlotsContainer.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const slot = document.createElement("div");
        slot.className = "team-slot";
        slot.dataset.slot = i;
        slot.innerHTML = `<span>+</span>`;
        teamSlotsContainer.appendChild(slot);
    }
}

function addPokemonToTeam(pokemonKey) {
    const pokemon = pokemonDatabase[pokemonKey];
    const newPokemon = new Pokemon(
        pokemon.name,
        pokemon.type,
        pokemon.hp,
        pokemon.level,
        pokemon.moves
    );

    playerTeam.push(newPokemon);
    updateTeamDisplay();

    // Habilitar botão de iniciar batalha se tiver 6 Pokémon
    startBattleBtn.disabled = playerTeam.length !== 6;
}

function removePokemonFromTeam(index) {
    playerTeam.splice(index, 1);
    updateTeamDisplay();
    startBattleBtn.disabled = playerTeam.length !== 6;
}

function updateTeamDisplay() {
    const slots = document.querySelectorAll(".team-slot");

    slots.forEach((slot, index) => {
        if (index < playerTeam.length) {
            const pokemon = playerTeam[index];
            slot.className = "team-slot filled";
            slot.innerHTML = `
                <div class="pokemon-mini ${pokemon.name.toLowerCase()}"></div>
                <div class="remove-btn">×</div>
            `;

            const removeBtn = slot.querySelector(".remove-btn");
            removeBtn.addEventListener("click", e => {
                e.stopPropagation();
                removePokemonFromTeam(index);
            });
        } else {
            slot.className = "team-slot";
            slot.innerHTML = `<span>+</span>`;
        }
    });
}

function startBattle() {
    if (playerTeam.length !== 6) {
        alert("Selecione 6 Pokémon para sua equipe!");
        return;
    }

    // Criar equipe inimiga aleatória
    createRandomEnemyTeam();

    // Definir Pokémon ativos
    activePlayerPokemon = playerTeam[0];
    activeEnemyPokemon = enemyTeam[0];

    // Set random background
    setRandomBattleBackground();

    // Atualizar interface
    selectionScreen.style.display = "none";
    battleContainer.style.display = "block";

    updateBattleUI();

    // Iniciar estado de batalha
    gameState = "battle";
    turnState = "playerTurn";

    displayMessage(`Um ${activeEnemyPokemon.name} inimigo apareceu! O que ${activePlayerPokemon.name} vai fazer?`);
}

function createRandomEnemyTeam() {
    enemyTeam = [];
    const availablePokemon = Object.keys(pokemonDatabase);

    // Gerar uma equipe aleatória de 6 Pokémon
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * availablePokemon.length);
        const pokemonKey = availablePokemon[randomIndex];
        const pokemon = pokemonDatabase[pokemonKey];

        const newPokemon = new Pokemon(
            pokemon.name,
            pokemon.type,
            pokemon.hp,
            pokemon.level,
            pokemon.moves
        );

        enemyTeam.push(newPokemon);
    }
}

function updateBattleUI() {
    // Atualizar informações do jogador
    playerNameEl.textContent = activePlayerPokemon.name;
    playerLevelEl.textContent = `Nv ${activePlayerPokemon.level}`;
    playerHpEl.style.width = `${(activePlayerPokemon.currentHp / activePlayerPokemon.maxHp) * 100}%`;
    playerHpNumberEl.textContent = `${activePlayerPokemon.currentHp}/${activePlayerPokemon.maxHp}`;
    playerSpriteEl.className = `pokemon-sprite player-sprite ${activePlayerPokemon.name.toLowerCase()}`;

    // Atualizar informações do inimigo
    enemyNameEl.textContent = activeEnemyPokemon.name;
    enemyLevelEl.textContent = `Nv ${activeEnemyPokemon.level}`;
    enemyHpEl.style.width = `${(activeEnemyPokemon.currentHp / activeEnemyPokemon.maxHp) * 100}%`;
    enemyHpNumberEl.textContent = `${activeEnemyPokemon.currentHp}/${activeEnemyPokemon.maxHp}`;
    enemySpriteEl.className = `pokemon-sprite enemy-sprite ${activeEnemyPokemon.name.toLowerCase()}`;

    // Atualizar botões de ataque
    attackBtns.forEach((btn, index) => {
        if (index < activePlayerPokemon.moves.length) {
            btn.textContent = activePlayerPokemon.moves[index].name;
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Ajustar cores da barra de HP com base na quantidade
    const adjustHpColor = (element, percentage) => {
        if (percentage > 50) {
            element.style.backgroundColor = "#3c3";
        } else if (percentage > 20) {
            element.style.backgroundColor = "#fc3";
        } else {
            element.style.backgroundColor = "#f44";
        }
    };

    adjustHpColor(playerHpEl, (activePlayerPokemon.currentHp / activePlayerPokemon.maxHp) * 100);
    adjustHpColor(enemyHpEl, (activeEnemyPokemon.currentHp / activeEnemyPokemon.maxHp) * 100);
}

function updatePokemonSwitchMenu() {
    pokemonSwitchMenu.innerHTML = "";

    playerTeam.forEach((pokemon, index) => {
        const button = document.createElement("button");
        button.className = `switch-btn ${pokemon.isFainted() ? "fainted" : ""}`;
        if (pokemon === activePlayerPokemon) {
            button.className += " active";
        }

        const hpPercentage = (pokemon.currentHp / pokemon.maxHp) * 100;

        button.innerHTML = `
            <div class="pokemon-icon ${pokemon.name.toLowerCase()}"></div>
            <div class="switch-info">
                <div>${pokemon.name}</div>
                <div class="hp-mini">
                    <div class="hp-mini-current" style="width: ${hpPercentage}%"></div>
                </div>
                <div>${pokemon.currentHp}/${pokemon.maxHp}</div>
            </div>
        `;

        if (!pokemon.isFainted() && pokemon !== activePlayerPokemon) {
            button.addEventListener("click", () => {
                switchPlayerPokemon(index);
            });
        }

        pokemonSwitchMenu.appendChild(button);
    });
}

function switchPlayerPokemon(index) {
    if (turnState === "animating") return;

    const newPokemon = playerTeam[index];

    if (newPokemon.isFainted() || newPokemon === activePlayerPokemon) {
        return;
    }

    turnState = "switching";
    pokemonSwitchMenu.style.display = "none";
    mainMenuEl.style.display = "grid";

    displayMessage(`Volte, ${activePlayerPokemon.name}!`);

    setTimeout(() => {
        activePlayerPokemon = newPokemon;
        updateBattleUI();

        displayMessage(`Vai, ${activePlayerPokemon.name}!`);

        setTimeout(() => {
            // Após trocar, o inimigo ataca
            turnState = "enemyTurn";
            executeEnemyTurn();
        }, 1500);
    }, 1000);
}

function executePlayerTurn(moveIndex) {
    if (turnState !== "playerTurn") return;

    turnState = "animating";
    attackMenuEl.style.display = "none";
    mainMenuEl.style.display = "grid";

    const move = activePlayerPokemon.moves[moveIndex];
    const result = activePlayerPokemon.attack(moveIndex, activeEnemyPokemon);

    displayMessage(`${activePlayerPokemon.name} usou ${result.moveName}!`);

    // Healing move
    if (result.healing) {
        const healAmount = -result.damage;
        
        // Show healing animation
        playerSpriteEl.classList.add("healing");
        
        setTimeout(() => {
            playerSpriteEl.classList.remove("healing");
            updateBattleUI();
            
            displayMessage(`${activePlayerPokemon.name} recuperou HP!`);
            
            setTimeout(() => {
                turnState = "enemyTurn";
                executeEnemyTurn();
            }, 1500);
        }, 1500);
        
        return;
    }

    // Check if the attack missed
    if (result.damage === 0) {
        displayMessage(`${result.moveName} errou!`);
        setTimeout(() => {
            turnState = "enemyTurn";
            executeEnemyTurn();
        }, 1500);
        return;
    }

    // Animate attack
    playerSpriteEl.classList.add("attacking");

    showAttackAnimation(move.type, "player", "enemy");

    setTimeout(() => {
        playerSpriteEl.classList.remove("attacking");
        enemySpriteEl.classList.add("hit");

        setTimeout(() => {
            enemySpriteEl.classList.remove("hit");
            updateBattleUI();

            // Verificar se o inimigo desmaiou
            if (activeEnemyPokemon.isFainted()) {
                displayMessage(`${activeEnemyPokemon.name} inimigo desmaiou!`);

                // Verificar se ainda há Pokémon restantes no time inimigo
                const nextEnemyIndex = enemyTeam.findIndex(p => !p.isFainted() && p !== activeEnemyPokemon);

                if (nextEnemyIndex !== -1) {
                    setTimeout(() => {
                        activeEnemyPokemon = enemyTeam[nextEnemyIndex];
                        updateBattleUI();
                        displayMessage(`Inimigo enviou ${activeEnemyPokemon.name}!`);

                        setTimeout(() => {
                            turnState = "playerTurn";
                            displayMessage(`O que ${activePlayerPokemon.name} vai fazer?`);
                        }, 1500);
                    }, 1500);
                } else {
                    // Não há mais Pokémon, fim da batalha
                    endBattle("win");
                }
                return;
            }

            // Mostrar mensagem de dano
            displayMessage(`${result.moveName} causou ${result.damage} de dano!`);

            setTimeout(() => {
                // Turno do inimigo
                turnState = "enemyTurn";
                executeEnemyTurn();
            }, 1500);
        }, 500);
    }, 1000);
}

function executeEnemyTurn() {
    if (turnState !== "enemyTurn") return;

    turnState = "animating";

    // Verificar se é melhor trocar de Pokémon
    const shouldSwitch = Math.random() < 0.2 && enemyTeam.some(p => !p.isFainted() && p !== activeEnemyPokemon);

    if (shouldSwitch) {
        // Encontrar Pokémon não desmaiado para trocar
        const availablePokemon = enemyTeam.filter(p => !p.isFainted() && p !== activeEnemyPokemon);
        if (availablePokemon.length > 0) {
            const newPokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];

            displayMessage(`Inimigo: Volte, ${activeEnemyPokemon.name}!`);

            setTimeout(() => {
                activeEnemyPokemon = newPokemon;
                updateBattleUI();

                displayMessage(`Inimigo enviou ${activeEnemyPokemon.name}!`);

                setTimeout(() => {
                    turnState = "playerTurn";
                    displayMessage(`O que ${activePlayerPokemon.name} vai fazer?`);
                }, 1500);
            }, 1000);

            return;
        }
    }

    // Escolher um movimento aleatório
    const moveIndex = Math.floor(Math.random() * activeEnemyPokemon.moves.length);
    const move = activeEnemyPokemon.moves[moveIndex];
    const result = activeEnemyPokemon.attack(moveIndex, activePlayerPokemon);

    displayMessage(`${activeEnemyPokemon.name} inimigo usou ${result.moveName}!`);

    // Healing move
    if (result.healing) {
        const healAmount = -result.damage;
        
        // Show healing animation
        enemySpriteEl.classList.add("healing");
        
        setTimeout(() => {
            enemySpriteEl.classList.remove("healing");
            updateBattleUI();
            
            displayMessage(`${activeEnemyPokemon.name} inimigo recuperou HP!`);
            
            setTimeout(() => {
                turnState = "playerTurn";
                displayMessage(`O que ${activePlayerPokemon.name} vai fazer?`);
            }, 1500);
        }, 1500);
        
        return;
    }
    // Check if the attack missed
    if (result.damage === 0) {
        displayMessage(`${result.moveName} errou!`);
        setTimeout(() => {
            turnState = "playerTurn";
            displayMessage(`O que ${activePlayerPokemon.name} vai fazer?`);
        }, 1500);
        return;
    }

    // Animate attack
    enemySpriteEl.classList.add("attacking");

    showAttackAnimation(move.type, "enemy", "player");

    setTimeout(() => {
        enemySpriteEl.classList.remove("attacking");
        playerSpriteEl.classList.add("hit");

        setTimeout(() => {
            playerSpriteEl.classList.remove("hit");
            updateBattleUI();

            // Verificar se o jogador desmaiou
            if (activePlayerPokemon.isFainted()) {
                displayMessage(`${activePlayerPokemon.name} desmaiou!`);

                // Verificar se ainda há Pokémon restantes no time do jogador
                const nextPlayerIndex = playerTeam.findIndex(p => !p.isFainted() && p !== activePlayerPokemon);

                if (nextPlayerIndex !== -1) {
                    setTimeout(() => {
                        // Mostrar menu de troca de Pokémon
                        mainMenuEl.style.display = "none";
                        pokemonSwitchMenu.style.display = "grid";
                        updatePokemonSwitchMenu();
                        displayMessage("Selecione um Pokémon para enviar!");
                        turnState = "switching";
                    }, 1500);
                } else {
                    // Não há mais Pokémon, fim da batalha
                    endBattle("loss");
                }
                return;
            }

            // Mostrar mensagem de dano
            displayMessage(`${result.moveName} causou ${result.damage} de dano!`);

            setTimeout(() => {
                // Turno do jogador
                turnState = "playerTurn";
                displayMessage(`O que ${activePlayerPokemon.name} vai fazer?`);
            }, 1500);
        }, 500);
    }, 1000);
}

function showAttackAnimation(moveType, source, target) {
    const battleScene = document.querySelector(".battle-scene");
    const attackAnimation = document.createElement("div");
    attackAnimation.className = `attack-animation ${moveType}-attack`;
    battleScene.appendChild(attackAnimation);

    // Get source and target elements
    const sourceElement = source === "player" ? playerSpriteEl : enemySpriteEl;
    const targetElement = target === "player" ? playerSpriteEl : enemySpriteEl;
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const sceneRect = battleScene.getBoundingClientRect();
    
    // Calculate start and end positions
    const startX = sourceRect.left - sceneRect.left + sourceRect.width/2;
    const startY = sourceRect.top - sceneRect.top + sourceRect.height/2;
    const endX = targetRect.left - sceneRect.left + targetRect.width/2;
    const endY = targetRect.top - sceneRect.top + targetRect.height/2;
    
    // Set initial position at source
    attackAnimation.style.position = "absolute";
    attackAnimation.style.left = `${startX}px`;
    attackAnimation.style.top = `${startY}px`;
    
    // Animate from source to target
    attackAnimation.style.transition = "left 0.8s ease-out, top 0.8s ease-out";
    
    // Start animation in the next frame
    setTimeout(() => {
        attackAnimation.style.left = `${endX}px`;
        attackAnimation.style.top = `${endY}px`;
    }, 50);
    
    setTimeout(() => {
        battleScene.removeChild(attackAnimation);
    }, 1000);
}

function displayMessage(message) {
    messageBoxEl.textContent = message;
}

function endBattle(result) {
    gameState = "gameOver";

    // Mostrar tela de fim de jogo
    setTimeout(() => {
        const resultTextEl = document.getElementById("result-text");

        if (result === "win") {
            resultTextEl.textContent = "Você Venceu!";
        } else {
            resultTextEl.textContent = "Você Perdeu!";
        }

        battleContainer.style.display = "none";
        gameOverScreen.style.display = "block";
    }, 1500);
}

function resetGame() {
    // Resetar variáveis de estado
    playerTeam = [];
    enemyTeam = [];
    activePlayerPokemon = null;
    activeEnemyPokemon = null;
    gameState = "selection";
    turnState = "playerTurn";

    // Voltar para a tela de seleção
    showSelectionScreen();
    createTeamSlots();

    startBattleBtn.disabled = true;
}

function showSelectionScreen() {
    selectionScreen.style.display = "block";
    battleContainer.style.display = "none";
    gameOverScreen.style.display = "none";
    startBattleBtn.disabled = true;
}

function setRandomBattleBackground() {
    const backgrounds = [
        '/cenario1.jpg',
        '/cenario2.jpg',
        '/cenario3.jpg',
        '/cenario4.jpg',
        '/cenario5.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const battleScene = document.querySelector('.battle-scene');
    battleScene.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

// Iniciar o jogo quando a página carregar
window.addEventListener("load", initGame);
