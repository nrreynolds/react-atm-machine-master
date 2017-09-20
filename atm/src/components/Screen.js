import React, { Component } from 'react';
import '../css/App.css';
import accounting from 'accounting';

class Screen extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderScreen(){
    const state = this.props.state
    if(state.currentAction.string){
      if(state.currentAccount.string){
        if (state.currentAction.string === 'Transfer'){
          const otherAccount = ['savings', 'checking'].filter(account=>{
            return account !== state.currentAccount.string
          })[0];
          return (
            <div>
              <p onClick={(e)=>{this.props.state.home()}}>Home</p>
              <h1>{state.currentAction.string}</h1>
              <h2>
                From: {this.capitalizeFirstLetter(state.currentAccount.string)}
                <span className='ballance'>{accounting.formatMoney(state[state.currentAccount.string].value)}</span>
              </h2>
              <h2>
                To: {this.capitalizeFirstLetter(otherAccount)}
                <span className='ballance'>{accounting.formatMoney(state[otherAccount].value)}</span>
              </h2>
              <input value={state.input.string} readOnly onKeyUp={(e)=>{state.input.change(e)}} autoFocus />
            </div>
          )
        } else {
          return (
            <div>
              <p className="action" onClick={(e)=>{this.props.state.home()}}>Home</p>
              <h1>{state.currentAction.string}</h1>
              <h2>
                {this.capitalizeFirstLetter(state.currentAccount.string)}
                <span className='ballance'>{accounting.formatMoney(state[state.currentAccount.string].value)}</span>
              </h2>
              <input value={state.input.string} readOnly onKeyUp={(e)=>{state.input.change(e)}} autoFocus />
            </div>
          )
        }
      } else {
        if (state.currentAction.string === 'Transfer'){
          return (
            <div>
              <p className="action" onClick={(e)=>{this.props.state.home()}}>Home</p>
              <h1>{state.currentAction.string} from:</h1>
              {['savings', 'checking'].map((account, i)=>{
                return(
                  <div onClick={(e)=>{state.currentAccount.setAccount(account)}} key={i}>
                    <h2 className="action">{this.capitalizeFirstLetter(account)}<span className='ballance'>{accounting.formatMoney(state[account].value)}</span></h2>
                  </div>
                )
              })}
            </div>
          )
        } else{
          return (
            <div>
              <p className="action" onClick={(e)=>{this.props.state.home()}}>Home</p>
              <h1>{state.currentAction.string}</h1>
              {['savings', 'checking'].map((account, i)=>{
                return(
                  <div onClick={(e)=>{state.currentAccount.setAccount(account)}} key={i}>
                    <h2 className="action">{this.capitalizeFirstLetter(account)}<span className='ballance'>{accounting.formatMoney(state[account].value)}</span></h2>
                  </div>
                )
              })}
            </div>
          )
        }
      }
    } else {

      return(
        <div>
          <h2>Savings<span className='ballance'>{accounting.formatMoney(state.savings.value)}</span></h2>
          <h2>Checking<span className='ballance'>{accounting.formatMoney(state.checking.value)}</span></h2>
          {['Deposit', 'Withdraw', 'Transfer'].map((action, i)=>{
            return(
              <div onClick={(e)=>{state.currentAction.setAction(action)}} key={i}>
                <h3 className="action">{action}</h3>
              </div>
            )})}
        </div>

      )
    }
  }



  render() {
    return (
      <div className="Screen">
        {this.renderScreen()}
      </div>
    );
  }
}

export default Screen;
