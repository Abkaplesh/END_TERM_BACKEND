import Filter, { Sort, FilterValue } from "data-engine";

var Filter = require("data-filter");

    const filter = new Filter({ data: [] });
    const filter2 = new Filter({ sortEngine: new Sort() });

    filter.Data = [];
    filter.setData([]);
    filter.Data = undefined; // Will set data to empty array
    // Getter
    const originalData = sort.Data;
    const filteredData = sort.FilteredData;
    const filteredData = sort.getFilteredData();

    
 const filtered = filter.addFilter(name, value, type);
    const filtered = filter.update(filterValue1, filterValue2, ...);

     const filtered = filter.removeFilters('Name of filter', filterValue);
    const filtered = filter.removeFilters('Name of filter');
  filter.SortEngine = new Sort();
    const sortEngine = filter.SortEngine;
    // See: sort-engine
    filter.SortEngine.sortBy('name')