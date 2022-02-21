import PropTypes from "prop-types";
import './Kantor.css';

function Kantor(props) {
    return (
        <div className="group">
      <input type="text" value={props.value} onChange={ev => props.change_value(ev.target.value)} />
      <select value={props.currency} onChange={ev => props.change_currency(ev.target.value)}>
        {props.currencies.map((currency => (
          <option value={currency}>{currency}</option>
        )))}
      </select>
    </div>
    ); 
}

Kantor.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  change_value: PropTypes.func,
  change_currency: PropTypes.func,

}

export default Kantor;