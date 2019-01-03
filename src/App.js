import React, {Component, Fragment} from 'react';

import './App.scss';
import {CustomSlider} from "./CustomSlider";

const YEARLY_INTEREST_RATE = 0.05;

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
                    <header className="header main__header">
                        <span className="header__osvalds">osvalds</span>
                        <span className="header__loan">.loan</span>
                    </header>
                    <div className="main__right">
                        <div className="loan-header">
                            Es vēlos saņemt <span className="loan-header__special">{this.state.amount} EUR</span>
                        </div>
                        <CustomSlider domain={[500, 8000]}
                                      step={100}
                                      values={[this.state.amount]}
                                      onUpdate={(values) => {
                                          this.setState({amount: values[0]})
                                      }}/>
                        <div className="loan-header">
                            Uz <span
                            className="loan-header__special">{this.state.period} </span>{this.pluralize(this.state.period, "mēnesi", "mēnešiem")}
                        </div>
                        <CustomSlider domain={[1, 24]}
                                      step={1}
                                      values={[this.state.period]}
                                      onUpdate={(values) => {
                                          this.setState({period: values[0]})
                                      }}/>
                        <div className="loan-wrapper">
                            <div className="loan-description">
                                <div className="loan-description__left">
                                    Ikmēneša maksājums:
                                </div>
                                <div className="loan-description__right">
                                    {this.monthlyPayments(this.state.amount, this.state.period).toFixed(2)} EUR
                                </div>
                            </div>
                            <div className="loan-description">
                                <div className="loan-description__left">
                                    Galā samaksāsi:
                                </div>
                                <div className="loan-description__right">
                                    {this.totalWithInterest(this.state.amount, this.state.period).toFixed(2)} EUR
                                </div>
                            </div>
                            <div className="loan-description">
                                <div className="loan-description__left">
                                    Es nopelnīšu
                                </div>
                                <div className="loan-description__right">
                                    {this.interestPayments(this.state.amount, this.state.period).toFixed(2)} EUR
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main__left">
                        <div className="hero">
                            <img src={`${process.env.PUBLIC_URL}/img/hero.jpg`} alt="Piķis nav problēma" className="hero__image"/>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <a className="footer__link"
                        href="https://www.youtube.com/watch?v=UROLAsyc_KU">
                        💰💰💰💰
                    </a>
                </footer>
            </Fragment>
        );
    }
}

export default App;
