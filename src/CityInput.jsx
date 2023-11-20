import PropTypes from "prop-types";

export function CityInput({city, setCity}){

    return(
        <input value={city} onChange={(e) => setCity(e.target.value)}  placeholder='Enter a City...'/>
    )
}

CityInput.propTypes = {
    city : PropTypes.string,
    setCity: PropTypes.func
}