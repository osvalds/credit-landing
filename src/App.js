import React, {Component, Fragment} from 'react';

import './App.css';
import {CustomSlider} from "./CustomSlider";

class App extends Component {

    state = {
        amount: 1000,
        period: 6
    };

    pluralize = (count, singular, plural) => {
        return (count === 1) ? singular : plural;
    };


    render() {
        return (
            <div className="main">
                <div>
                    Es vēlos saņemt {this.state.amount} EUR
                </div>
                <CustomSlider domain={[500, 8000]}
                              step={100}
                              values={[this.state.amount]}
                              onUpdate={(values) => {
                                  this.setState({amount: values[0]})
                              }}/>
                <div>
                    Uz {this.state.period} {this.pluralize(this.state.period, "mēnesi", "mēnešiem")}
                </div>
                <CustomSlider domain={[1, 24]}
                              step={1}
                              values={[this.state.period]}
                              onUpdate={(values) => {
                                  this.setState({period: values[0]})
                              }}/>
            </div>
        );
    }
}

export default App;
