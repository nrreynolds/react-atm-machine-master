# React ATM machine App

![](https://media.giphy.com/media/3oriePkL53IxK0Aq52/giphy.gif)

Now that we've successfully collaborated with the DSI folks, let's get back to brass tax. And in this case, a luxury tax. You mission today, should you chose to accept it (*spoilers, you have to accept*) is to create one of those new fangled atm machines. Don't forget to use your PIN number


## Setup

There are no files provided, that's because we're going to use our old friend, tried and true, `create-react-app`. That guy, he takes care of everything doesn't he. I'll be glad when he's dead...

### Learning Objectives
* React with `create-react-app`
* Error Handling

### Completion
Part 1 - 3

### Part 1
While there are no setup files, that doesn't mean we shouldn't create some. But good old react let's us reuse components. Let's create an `App.jsx` and and `Account.jsx` and use it twice to pass the props `name`, once for "Checking" and once for "Savings".


#### Part 2 `src/Account.js`
1. Use the property you set in `App.js` and add it to the `<h2>`
2. Add a `balance` property to `state` and set to 0 initially
3. When the `Deposit` button is clicked, you should add the amount entered in the text field to the balance
4. When the `Withdraw` button is clicked, you should deduct the amount entered in the text field to the balance
  - You should not be able to withdraw more than the current balance
5. If the current balance is 0, you should add a class of `zero` to the `<div className="balance">` div

#### Part 3 - Error Handling
We can't always count on people using our applications correctly - in fact we should always assume that someone is trying to break our code! Your applications should always have some level of "error handling". Error handling is simply the concept of anticipating different ways that invalid user input could break your application and writing robust code to handle that gracefully.

Try handling these scenarios:
1. What if a User enters a negative number and clicks **Deposit**
2. What if a User enters a negative number and clicks **Withdraw**
3. What if a User enters a string and clicks Deposit or Withdraw?

## Bonus
Add the [accounting](https://www.npmjs.com/package/accounting) package to format the balance.

## Bonus 2

Add an ability to transfer money from one account to the other. Make sure that your clients aren't able to overdraft. Or let them overdraft an give them *protection* aka, charge them a fee. Mwahahahahaha  
![bankers](https://i.imgflip.com/1mow6h.jpg)  

## Hints
- Remember to set a `ref` on the text field for targeting
- The amount entered in the text field will initially be a string, so you'll need to convert that to a number
- Don't forget to `bind` your click methods!
