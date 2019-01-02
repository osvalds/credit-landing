import React, {Component, Fragment} from 'react';

import './App.scss';
import {CustomSlider} from "./CustomSlider";

const YEARLY_INTEREST_RATE = 0.045;

class App extends Component {

    state = {
        amount: 1000,
        period: 12
    };

    pluralize = (count, singular, plural) => {
        return (count === 1) ? singular : plural;
    };

    /*
    * P = (r * (PV)) / (1 - (1 + r)^(-n))
    *
    * P - Payment
    * PV - Present Value
    * r - rate per period
    * n - number of periods
    * */
    monthlyPayments = (pv, n) => {
        let r = YEARLY_INTEREST_RATE / 12;

        let p = (r * pv) / (1 - Math.pow((1 + r), (-n)));

        return p;
    };

    totalWithInterest = (pv, n) => {
        return this.monthlyPayments(pv, n) * n;
    };

    interestPayments = (pv, n) => {
        return this.totalWithInterest(pv, n) - this.state.amount;
    };

    render() {
        return (
            <Fragment>
                <div className="main">
                    <header className="header">
                        <span className="header__osvalds">osvalds.</span>
                        <span className="header__loan">loan</span>
                    </header>
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

                    <div>Ikmēneša
                        maksājums: {this.monthlyPayments(this.state.amount, this.state.period).toFixed(2)} EUR
                    </div>
                    <div>Galā samaksāsi: {this.totalWithInterest(this.state.amount, this.state.period).toFixed(2)} EUR
                    </div>
                    <div>Es nopelnīšu {this.interestPayments(this.state.amount, this.state.period).toFixed(2)} EUR</div>
                </div>
                <footer className="footer">
                    Lapā atrodamajam saturam ir informatīva nozīme. Datus nevāciju, cookies nevajag.
                </footer>
            </Fragment>
        );
    }
}

export default App;
