/**
 * Keressünk a Roxfort-i házak között
 * Keresési feltételek lehetnek:
 *  - név, leírás vagy elem alapján (bármelyik a háromból, kis és nagybetű nem számít) - query,
 *  - alapértékek egyike megtalálható (pl. bátorság, szerénység, stb.) - traits (tömb vagy null)
 *  - rendezés név, jelkép vagy pontszám alapján, növekvő vagy csökkenő sorrendben - orderBy: 'name.ASC', 'name.DESC', 'animal.ASC', 'animal.DESC', 'points.ASC', 'points.DESC',
 * Alapértelmezett rendezés: név szerint növekvő sorrend ('name.ASC')
 * Ha valamire nincs keresési kitétel, akkor alapvetően mindegyik elemre igaznak vesszük
 */

const HOUSES = require('./03-input.json');
const LANG = 'hu-HU';

const filterByQuery = (query) => {
  if (!query) {
    return Boolean;
  }
  const searchQuery = query.toLocaleLowerCase(LANG);
  return (house) => (
    house.name.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1 ||
    house.description.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1 ||
    house.animal.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1
  );
};

const filterByTraits = (traits) => {
  if (!(traits && Array.isArray(traits))) {
    return Boolean;
  }
  return (house) => house.traits.some((trait) => traits.includes(trait));
};

const sortOrder = (orderBy) => {
  const [order, direction] = orderBy?.split('.') ?? ['name', 'ASC'];
  return (house1, house2) => {
    let result = 0;
    if (order === 'name' || order === 'animal') {
      result = house1[order].localeCompare(house2[order], LANG);
    } else if (order === 'points') {
      result = house1.points - house2.points;
    }
    return direction === 'ASC' ? result : -result;
  };
};

const search = ({ query, traits, orderBy }) => {
  return HOUSES
    .filter(filterByQuery(query))
    .filter(filterByTraits(traits))
    .sort(sortOrder(orderBy));
};

console.log(search({ orderBy: 'points.ASC' }));
