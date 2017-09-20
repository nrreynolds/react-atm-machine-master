import React, { Component } from 'react';
import '../css/App.css';

class Buttons extends Component {

  renderButtons(){
    const buttons = [
      [
        {
          value: 1,
          text: ''
        },
        {
          value: 2,
          text: 'ABC'
        },
        {
          value: 3,
          text: 'DEF'
        },
        {
          value: 'Cancel',
          text: ''
        }
      ],
      [
        {
          value: 4,
          text: 'GHI'
        },
        {
          value: 5,
          text: 'JKL'
        },
        {
          value: 6,
          text: 'MNO'
        },
        {
          value: 'Clear',
          text: ''
        }
      ],
      [
        {
          value: 7,
          text: 'PQRS'
        },
        {
          value: 8,
          text: 'TUV'
        },
        {
          value: 9,
          text: 'WXYZ'
        },
        {
          value: 'Back',
          text: ''
        }

      ],
      [
        {
          value: '',
          text: ''
        },
        {
          value: 0,
          text: ''
        },
        {
          value: '',
          text: ''
        },
        {
          value: 'Enter',
          text: ''
        }
      ]
    ];
    return buttons.map((row, i)=>{
      return (
        <div className="button-row" key={i}>
          {row.map((button, ii)=>{
            return (
              <button onClick={(e)=>{this.props.action(button.value)}} key={ii}>
                <span className='buttonVal'>{button.value}</span>
                <span className='buttonText'>{button.text}</span>
              </button>
            )
          })}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Buttons">
        {this.renderButtons()}
      </div>
    );
  }
}

export default Buttons;
