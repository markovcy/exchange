import './App.css';
import Kantor from './Kantor';
import Header from "./Header";
import {useState, useEffect} from "react";
import axios from "axios";

let rates_curr = {}

function App() {

  const [value1, set_value1] = useState(1);
  const [value2, set_value2] = useState(1);
  const [currency1, set_curr1] = useState('UAH');
  const [currency2, set_curr2] = useState('USD');
  const [rates, set_rate] = useState([]);

  useEffect(  () => {
    axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].cc === 'USD') {
          rates_curr['USD'] = response.data[i].rate
        
        }
        if (response.data[i].cc === 'EUR') {
          rates_curr['EUR'] = response.data[i].rate
        }
        rates_curr['UAH'] = 1
      }
      set_rate(rates_curr)
  })
  }, [])

  
  useEffect(() => {
    if (!!rates) {
      function init() {
        change_value1(1);
      }
      init();
    }
  }, [rates]);

  function change_value1(value1){
    set_value2((value1 * rates_curr[currency1] / rates_curr[currency2]).toFixed(4));
    set_value1(value1);
  }

  function change_currency1(currency1){
    set_value2((value1 * rates_curr[currency1]/rates_curr[currency2]).toFixed(4));
    set_curr1(currency1)
  }

  function change_value2(value2){
    set_value1((value2 * rates_curr[currency2]/rates_curr[currency1]).toFixed(4));
    set_value2(value2);
  }

  function change_currency2(currency2){
    set_value1((value2* rates_curr[currency2]/rates_curr[currency1]).toFixed(4));
    set_curr2(currency2)
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <h2>Currency Rates</h2>
      <Header
          name_USD={'USD'}
          rate_USD={rates_curr['USD']}
          name_EUR={'EUR'}
          rate_EUR={rates_curr['EUR']}
        />
      <Kantor
        change_value={change_value1}
        change_currency={change_currency1}
        currencies={Object.keys(rates_curr)}
        value={value1}
        currency={currency1} />
        
      <Kantor
        change_value={change_value2}
        change_currency={change_currency2}
        currencies={Object.keys(rates_curr)}
        value={value2}
        currency={currency2} />
    </div>

  );

}

export default App;
