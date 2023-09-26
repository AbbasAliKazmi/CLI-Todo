#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    })
}

async function welcome() {
    let rainbowAnimation = chalkAnimation.rainbow('Welcome to Your Todos');
    await sleep();
    rainbowAnimation.stop();
    console.log(chalk.blue.bold(`

    ██████████╗   ██████╗      ███████╗       ██████╗     ██    ███████╗
        ██║      ██╔═══██╗     ██╔═══██╗     ██╔═══██╗     ))   ██╔════╝
        ██║      ██╔═══██╗     ██╔═══██╗     ██╔═══██╗          ███████╗
        ██║      ██╔═══██╗     ██╔═══██╗     ██╔═══██╗          ╚════██║       
        ██║      ╚██████╔╝     ███████╔╝     ╚██████╔╝          ███████║
        ╚═╝       ╚═════╝      ╚═════╝        ╚═════╝           ╚══════╝       
 `))
}

await welcome();

interface ansType {
    menuOpt: string,
    todo: string
}

let todos: string[] = [];
let  loop:boolean = true;
let  answers1: ansType;
let  answers2: ansType;
let  answers3: ansType;

async function startLoop(){
    while(loop) {
        await displayMenuItem();
    }
}

startLoop();

async function displayMenuItem() {
    answers1 = await inquirer.prompt([
        {
            type: "list",
            name: "menuOpt",
            choices: ["Add Todo Item", "Delete Todo Item" , "Exit"],
            message: chalk.red.bold("Please Select One Option")
        }
    ]);

    switch(answers1.menuOpt){
        case 'Add Todo Item':{
            await addTodo();
            break;
        }
        case 'Delete Todo Item': {
            await deleteTodo();
            break;
        }
        default: {
            loop = false;
            console.log("Exit App");
            break;
        }
    }
}

async function addTodo() {
    answers2 = await inquirer.prompt([
        {
            type: "input",
            name: "todo",
            message: chalk.bgGreen.bold("Enter What To Do")
        }
    ])
    todos.push(answers2.todo);
    console.log(todos);
}

async function deleteTodo() {
    if(todos.length>0){
    answers3 = await inquirer.prompt([
        {
            type: "list",
            name: "menuOpt",
            choices: todos,
            message: chalk.bgGreen.bold("Please Select Todo for Delete")
        }
    ]);
    let i = 0;
    do{
        if(todos[i] === answers3.menuOpt){
            todos.splice(i, 1);
            break;
        }
        i++;
    }while(i<todos.length);
    console.log(todos);
    }else{
        console.log(chalk.bgWhiteBright.bold("No Todo items to delete"));
    }
} 




