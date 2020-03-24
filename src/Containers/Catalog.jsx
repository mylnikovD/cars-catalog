import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import { fetchData, initCarsStore } from '../redux/actions/cars';
import { debounce } from 'lodash';

function Catalog(props) {
  const { dispatch, cars } = props;

  const [carsToDisplay, setCarsToDisplay] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const filterData = value => {
    console.log('IM WORKInG');
    return cars.filter(car => {
      let result = false;
      for (let key in car) {
        if (car[key] && String(car[key]).includes(value)) {
          result = true;
        }
      }
      return result;
    });
  };

  useEffect(() => {
    dispatch(initCarsStore());
    dispatch(fetchData(''));
  }, []);

  useEffect(() => {
    setCarsToDisplay(filterData(''));
  }, [cars]);

  const debouncedFilter = useCallback(
    debounce(q => setCarsToDisplay(filterData(q)), 1000),
    [cars]
  );

  const inputHandler = e => {
    debouncedFilter(e.target.value);
  };

  console.log(carsToDisplay);

  return (
    <>
      <div className="catalog-header">
        <label htmlFor="filterInput">Search by all fields</label>
        <input
          id="filterInput"
          onChange={inputHandler}
          placeholder="Search query"
        />
      </div>
      <div className="cards-container">
        {carsToDisplay.size > 0 ? (
          carsToDisplay.map((card, index) => (
            <Card key={card.vin || `${index}`} card={card} />
          ))
        ) : (
          <div className="nothing-found-placeholder">
            <p>Nothing found, try another search term </p>
          </div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { carsReducer } = state;
  return carsReducer;
}

export default connect(mapStateToProps)(Catalog);
