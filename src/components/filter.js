const filterFruits = (fruits, filterName, filterFamily) => {
    const filtered = fruits.filter((fruit) =>
      fruit.name.toLowerCase().includes(filterName.toLowerCase()) &&
      fruit.family.toLowerCase().includes(filterFamily.toLowerCase())
    );
    return filtered;
  };
  
  module.exports = filterFruits;