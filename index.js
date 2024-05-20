#! / usr / bin / env node
// 4. What would you like to do (ATTACK , DRINK HEALTH POTION , RUN)   attack = 50 damage , potion = 30 hp( quantity of potion = 5 ) , Run = New place arrived + new mob
// // 5. Shadow (Attack = 50 , retaliation = -5 ) , skeleton (Attack = 50 , retaliation = -10) , Assassin (Attack = 50 , retaliation = -15) , Ragnarok (Attack = 50 , retaliation = -30)
// // 6. after every defeat of a mob ask to (either continue fighting or leave the dungeon)
// // 7. continue fighting = carry on , leave dungeon = exit
// // 8. after 3 mobs final boss will arrive
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellowBright("Welcome to the Dungeon!"));
console.log(chalk.whiteBright("-------------------------------------------------------------------"));
const mobs = {
    shadow: { Hp: 50, Retaliation: -5 },
    skeleton: { Hp: 100, Retaliation: -10 },
    assassin: { Hp: 110, Retaliation: -15 }
};
let hpOfPlayer = 100;
let noOfHealthPotions = 4;
let continuePlaying = true;
let currentMob = null;
while (continuePlaying) {
    if (hpOfPlayer <= 0) {
        console.log(chalk.red("You lost, see you soon player"));
        break;
    }
    if (Object.keys(mobs).length === 0) {
        console.log(chalk.green("You won the game!"));
        break;
    }
    if (currentMob === null) {
        const randomIndex = Math.floor(Math.random() * Object.keys(mobs).length);
        currentMob = Object.keys(mobs)[randomIndex];
        console.log(chalk.yellowBright(`* ${currentMob.charAt(0).toUpperCase() + currentMob.slice(1)} has appeared *`));
        console.log(chalk.whiteBright(`Your HP = ${hpOfPlayer}`));
        console.log(chalk.cyan(`No. of health potions you possess: ${noOfHealthPotions}`));
        console.log(chalk.yellow(`${currentMob}'s HP = ${mobs[currentMob].Hp}`));
    }
    const course = await inquirer.prompt([
        {
            name: "OfAction",
            message: "What would you like to do?",
            type: "list",
            choices: ["1. Attack", "2. Drink health potion", "3. Run"]
        }
    ]);
    if (course.OfAction === "1. Attack") {
        console.log(chalk.red(`You strike ${currentMob} for 50 damage`));
        mobs[currentMob].Hp -= 50;
        console.log(chalk.yellow(`You received ${mobs[currentMob].Retaliation} in retaliation`));
        hpOfPlayer += mobs[currentMob].Retaliation;
        console.log(chalk.whiteBright(`Your HP = ${hpOfPlayer}`));
        if (mobs[currentMob].Hp <= 0) {
            console.log(chalk.green(`${currentMob.charAt(0).toUpperCase() + currentMob.slice(1)} has been defeated!`));
            delete mobs[currentMob];
            currentMob = null;
        }
    }
    else if (course.OfAction === "2. Drink health potion") {
        console.log(chalk.blueBright("You drank a health potion"));
        console.log(chalk.blueBright("30 HP increased"));
        noOfHealthPotions--;
        console.log(chalk.cyan(`You are left with ${noOfHealthPotions} health potions`));
        hpOfPlayer += 30;
    }
    else if (course.OfAction === "3. Run") {
        console.log(chalk.yellowBright("You ran away from the battle!"));
        currentMob = null;
    }
    if (hpOfPlayer <= 0) {
        console.log(chalk.red("You lost, see you soon player"));
        break;
    }
    const course2 = await inquirer.prompt([
        {
            name: "ofAction",
            message: "What would you like to do now?",
            type: "list",
            choices: ["Continue fighting", "Exit dungeon"]
        }
    ]);
    if (course2.ofAction === "Exit dungeon") {
        console.log(chalk.red("You lose, see you soon player"));
        break;
    }
    else {
        console.log(chalk.green("Continuing the game..."));
    }
}
