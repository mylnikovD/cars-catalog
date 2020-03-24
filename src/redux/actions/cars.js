import actionTypes from './actionTypes';

import { List } from 'immutable';

export const initCarsStore = () => {
  return {
    type: actionTypes.INIT_STORE,
    payload: {
      cars: [],
      initialized: true
    }
  };
};

export const dataRequest = () => ({
  type: actionTypes.DATA_REQUESTED
});

export const dataSuccess = data => ({
  type: actionTypes.DATA_RECEIVED,
  data
});

export const dataFail = error => ({
  type: actionTypes.DATA_FAILED,
  error
});

export const getData = () =>
  fetch('/carsData.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      //If I'll have time I'll try to make the data structure normalized and more convenient to store and iterate on
      const countriesBrandsArr = data.map(country => country.children);
      const brandsModelsArr = countriesBrandsArr.map(brand =>
        brand.map(model => model.children)
      );
      // .map(model => model.children);
      // console.log('BRANDS', brandsArr);
      // console.log('MODELS', brandsModelsArr);

      const store = {};
      store.countries = {
        byId: data.reduce(
          (acc, country, countryIndex) => ({
            ...acc,
            [`country${countryIndex}`]: {
              id: `country${countryIndex}`,
              name: country.value,
              brands: country.children.map(
                (brand, index) => `brand${countryIndex + '' + index}`
              )
            }
          }),
          {}
        ),
        allIds: data.map((country, index) => `country${index}`)
      };
      let flattenBrands;
      store.brands = {
        byId: countriesBrandsArr.reduce((acc, country, countryIndex) => {
          return {
            ...acc,
            ...country.reduce((acc2, brand, brandIndex) => {
              flattenBrands = [...country];
              return {
                ...acc2,
                [`brand${countryIndex + '' + brandIndex}`]: {
                  id: `brand${countryIndex + '' + brandIndex}`,
                  name: brand.value,
                  models: brand.children.map(
                    (model, index) =>
                      `model${countryIndex + '' + brandIndex + index}`
                  )
                }
              };
            }, {})
          };
        }, {}),
        allIds: countriesBrandsArr
          .map((country, countryIndex) =>
            country.map(
              (brand, brandIndex) => `brand${countryIndex + '' + brandIndex}`
            )
          )
          .flat()
      };
      // console.log('FLATTEN BRANDS', flattenBrands);
      // console.log(store.countries);
      // console.log(store.brands);

      //here is the most obvious way to flatten the initial data object to get the full list of cars, with all the data from nodes above
      const cardsArr = data.map(country =>
        country.children.map(brand =>
          brand.children.map(model => {
            if (model.children.type === 'vin') {
              const returnObj = {
                [country.type]: country.value,
                [brand.type]: brand.value,
                [model.type]: model.value,
                [model.children.type]: model.children.value
              };
              return returnObj;
            }
            return model.children.children.map(vin => {
              const returnObj = {
                [country.type]: country.value,
                [brand.type]: brand.value,
                [model.type]: model.value,
                [model.children.type]: model.children.value,
                [vin.type]: vin.value
              };
              return returnObj;
            });
          })
        )
      );

      console.log(data);
      return List(cardsArr.flat(3));
    });

export const fetchData = (searchString = '') => {
  return async (dispatch, getState) => {
    try {
      dispatch(dataRequest());
      const data = await getData(searchString);
      dispatch(dataSuccess(data));
    } catch (err) {
      console.log('ERROR IN FETCH DATA', err);
      dispatch(dataFail(err));
    }
  };
};
