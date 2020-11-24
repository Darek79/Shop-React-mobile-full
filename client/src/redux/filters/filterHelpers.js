export const showOneProd = (stateArr, id) => {
  return stateArr.filter((prod) => prod.id === id);
};
export const showOneCategoryProd = (stateArr, ca, limit) => {
  return stateArr.map((prod, i) => {
    if (prod.category === ca) {
      return prod;
    }
  });
};

export const showBasket = (prods) => {
  let exists = [];
  prods.forEach((el, i) => {
    prods.forEach((el2, i2) => {
      if (el.id === el2.id && el.size === el2.size && i !== i2) {
        exists.push(el.id);
        if (!!exists.includes(el2.id)) {
          el2.price += el.price;
          el2.qty += el.qty;
          prods.splice(i, 1);
        }
      }
    });
  });
  exists.length = 0;
  return [...prods];
};

export const reduceToTotal = (prods) => {
  return prods.reduce((ac, it) => ac + it.val, 0).toFixed(2);
};
