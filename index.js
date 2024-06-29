#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//BANK ACCOUNT CLASS
class BankDetail {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // DEBIT/ WITHDRAW MONEY
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} has been suceesfully. Remainig balance is $${this.balance}`);
        }
        else {
            console.log("Sorry for Insuffiance Balance.");
        }
    }
    // DEPOSIT/CREDIT MONEY
    deposit(amount) {
        if (amount > 100) {
            amount -= 1, // fee charges
                this.balance += amount;
            console.log(`Deposit of $${amount} has been Succesfully, New Balance is $${this.balance}`);
        }
    }
    ;
    // CHECK BALANCE
    checkBalance() {
        console.log(`Current Balance is $${this.balance}.`);
    }
}
class Customer {
    fisteName;
    lastName;
    gender;
    age;
    mobileNo;
    accountNo;
    constructor(firstName, lastName, gender, age, mobileNo, accountNo) {
        this.fisteName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNo = mobileNo;
        this.accountNo = accountNo;
    }
}
// CREAT BANK ACCOUNTS
const accounts = [
    new BankDetail(4101, 10000),
    new BankDetail(5102, 20000),
    new BankDetail(6103, 30000)
];
// CREATE CUSTOMERS
const customers = [
    new Customer("Ayesha", "Akbar", "Female", 30, 314268756, accounts[0]),
    new Customer("Dua", "Khan", "Female", 29, 457623433, accounts[1]),
    new Customer("Ansha", "Khan", "Female", 28, 510122456, accounts[2])
];
//FUNCTION FOR CUSTOMER TO INTERACT WITH ACCOUNT
async function services() {
    do {
        const serviceProvide = await inquirer.prompt([{
                name: "AccountNumber",
                type: "number",
                message: " Please Enter your Account Number:"
            }]);
        const customer = customers.find(customer => customer.accountNo.accountNumber === serviceProvide.AccountNumber);
        if (customer) {
            console.log(chalk.blue.bold(`WELCOME!! ${customer.fisteName} ${customer.lastName}!\n`));
            let exit = false;
            while (!exit) {
                const ans = await inquirer.prompt([{
                        name: "select",
                        type: "list",
                        message: " Please choose an Operation",
                        choices: ["DEPOSIT", "WITHDRAW", "CHECKBALANCE", "EXIT"]
                    }]);
                switch (ans.select) {
                    case "DEPOSIT":
                        const depositAmonut = await inquirer.prompt([{
                                name: "amount",
                                type: "number",
                                message: "Please Enter the Amont to DEPOSIT:"
                            }]);
                        customer.accountNo.deposit(depositAmonut.amount);
                        break;
                    case "WITHDRAW":
                        const withdrawAmount = await inquirer.prompt([{
                                name: "amount",
                                type: "number",
                                message: "Please Enter the Amont to WITHDRAW:"
                            }]);
                        customer.accountNo.withdraw(withdrawAmount.amount);
                        break;
                    case "CHECKBALANCE":
                        customer.accountNo.checkBalance();
                        break;
                    case "EXIT":
                        console.log(chalk.blue.bold("\n Exiting the Program"));
                        console.log(chalk.yellow.bold("\n THANK YOU FOR CHOOSING US! HAVE A GREAT DAY....."));
                        return;
                }
            }
        }
        else {
            console.log(" Invalid Account Number, Please Enter the Correct Account Number.");
        }
    } while (true);
}
services();
