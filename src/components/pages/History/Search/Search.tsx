import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../../../store/hooks";
import {
  filterTransferHistory,
  filterRecExp,
  filterSumAbove, 
  filterSumUpTo,
} from "../../../../store/Search/searchSlice";
import "./Search.scss";
import { RecExp } from '../../../../store/Search/searchSelector';

const initialSum = {
  above: '0',
  upTo: '0',
}

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchRecExp, setSearchRecExp] = useState<string>(RecExp[0]);
  const [searchSum, setSearchSum] = useState(initialSum)

  useEffect(() => {
    searchName && dispatch(filterTransferHistory({ searchName }));
  }, [searchName]);

  const debouncedChangeName = useCallback(
    debounce((e: any) => setSearchName(e.target.value), 1000),
    []
  );

  const debouncedChangeSumAbove = debounce((e) => {
    dispatch(filterSumAbove(e.target.value))
  }, 1200);

  const debouncedChangeSumUpTo = debounce((e) => {
    dispatch(filterSumUpTo(e.target.value))
  }, 1200);

  const handleClick = ({ target: { name } }: any): void => {
    if (!name) return;
    setSearchRecExp(name);
    dispatch(filterRecExp(name));
  };

  return (
    <section className="search">
      <div className="search__name">
        <label>Wyszukaj po nazwisku</label>
        <input
          name="firstName"
          placeholder="Wyszukaj"
          onChange={debouncedChangeName}
        />
      </div>
      <label>Filtry</label>
      <div className="search__filters">
        <button
          onClick={handleClick}
          name="All"
          className={searchRecExp === RecExp[0] ? "active" : "filter"}
        >
          Wszystko
        </button>
        <button
          onClick={handleClick}
          name="Receipts"
          className={searchRecExp === RecExp[1] ? "active" : "filter"}
        >
          Wpływy
        </button>
        <button
          onClick={handleClick}
          name="Expenses"
          className={searchRecExp === RecExp[2] ? "active" : "filter"}
        >
          Wydatki
        </button>
      </div>
      <div className="search__sum">
        <label>Kwota</label>
        <div>
          <input onChange={debouncedChangeSumAbove} name="above" placeholder="0,00" type="text" />
          <input onChange={debouncedChangeSumUpTo} name="upTo" placeholder="0,00" type="text" />
        </div>
      </div>
    </section>
  );
};

export default Search;
