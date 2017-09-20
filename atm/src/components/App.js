import React, { Component } from 'react';
import '../css/App.css';
import Screen from './Screen';
import Buttons from './Buttons';
import accounting from 'accounting';
import Errors from './Errors';


class App extends Component {
  constructor(){
    super();
    this.state = {
      savings:{
        value: 0
      },
      checking:{
        value: 0
      },
      input: this.getInput(0),
      currentAccount: {
        string: '',
        setAccount: (account)=>{this.changeAccount(account)}
      },
      currentAction:{
        action: ()=>{this.deposit(this.state.input.value)},
        string: '',
        setAction: (action)=>{this.changeAction(action)}
      },
      errors: [],
      home: ()=>{this.goHome()}
    }
  }

  changeAction(action){
    this.setState({
      currentAction: this.getCurrentAction(action)
    })
  }

  getCurrentAction(action){
    const actions = {
      Deposit: ()=>{this.deposit(this.state.input.value)},
      Withdraw: ()=>{this.withdraw(this.state.input.value)},
      Transfer: ()=>{this.transfer(this.state.input.value)}
    }
    return{
      action: action ? actions[action] : '',
      string: action,
      setAction: (action)=>{this.changeAction(action)}
    }
  }

  getCurrentAccount(account){
    return {
      string: account,
      setAccount: (account)=>{this.changeAccount(account)}
    }
  }

  goHome(){
    this.setState(prev=>{
      prev.currentAction = this.getCurrentAction('');
      prev.currentAccount = this.getCurrentAccount('');
      return prev
    });
  }

  changeAccount(account){
    this.setState({
      currentAccount: this.getCurrentAccount(account)
    });
  }


  getInput(amount){
    return {
      string: accounting.formatMoney(amount),
      value: amount,
      change: (e) => {this.inputChange(e)}
    }
  }

  deposit(amount){
    this.setState((prev)=>{
      prev[prev.currentAccount.string].value += amount;
      prev.input = this.getInput(0);
      return prev;
    });
  }

  withdraw(amount){
    this.setState((prev)=>{
      if(prev[prev.currentAccount.string].value >= amount){
        prev[prev.currentAccount.string].value -= amount;
        prev.input = this.getInput(0);
      } else {
        prev.errors = this.getErrors(prev.errors, {title: 'Cannot Withdraw', msg: `You only have ${accounting.formatMoney(prev[prev.currentAccount.string].value)} in your account`});
        prev.input = this.getInput(prev[prev.currentAccount.string].value);
      }

      return prev;
    });
  }

  transfer(amount){
    this.setState((prev)=>{
      const otherAccount = ['savings', 'checking'].filter(account=>{
        return account !== prev.currentAccount.string
      })[0];
      if(prev[prev.currentAccount.string].value >= amount){
        prev[otherAccount].value += amount;
        prev[prev.currentAccount.string].value -= amount;
        prev.input = this.getInput(0);
      } else {
        prev.errors = this.getErrors(prev.errors, {title: 'Cannot Transfer', msg: `You only have ${accounting.formatMoney(prev[prev.currentAccount.string].value)} in ${prev.currentAccount.string}`});
        prev.input = this.getInput(prev[prev.currentAccount.string].value);
      }
      return prev;
    })
  }

  getErrors(errors, ...msgs){
    const [...errs] = errors;
    return [...errs, ...msgs]
  }

  removeError(i){
    this.setState(prev=>{
      const errors = prev.errors;
      errors.splice(i, 1);
      return {
        errors: errors
      }
    })
  }

  inputChange(e){
    const value = e.key;
    if (!isNaN(parseInt(value))){
      this.buttonAction(parseInt(value));
    } else if (value === 'Enter' || value==='Backspace' || value==='Escape'){
      this.buttonAction(value);
    }

  }

  buttonAction(action){
    if (typeof action === 'number'){
      this.setState(prev => {
        let inputVal = prev.input.value;
        if(inputVal === 0){
          inputVal += action / 100
        } else {
          inputVal = (inputVal * 10) + action / 100
        }
        return {input: this.getInput(inputVal)}
      });
    } else if (action === 'Enter'){
      this.state.currentAction.action();
    } else if (action === 'Clear'){
      this.setState(prev=>{
        return {
          input: this.getInput(0)
        }
      })
    } else if (action === 'Backspace' || action === 'Back'){
      this.setState(prev=>{
        return{
          input: this.getInput(prev.input.value < .1 ? 0 : prev.input.value / 10)
        }
      })
    } else if (action === 'Escape' || action === 'Cancel'){
      this.setState(prev=>{
        if(prev.currentAccount.string){
          return {
            currentAccount: this.getCurrentAccount('')
          }
        } else if (prev.currentAction.string){
          return {
            currentAction: this.getCurrentAction('')
          }
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Errors remove={(i)=>{this.removeError(i)}} errors={this.state.errors} />
        <Screen state={this.state} />
        <Buttons action={(action)=>{this.buttonAction(action)}} />
      </div>
    );
  }
}

export default App;
