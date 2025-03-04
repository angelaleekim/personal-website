import React, { useState } from "react";
import { Spinner } from "./Spinner";
import { useGroceryFetch } from "../util/useGroceryFetch";

export function GroceryPanel(props) {
  const [selectedUrl, setSelectedUrl] = useState("MDN");
  const { groceryData, isLoading, error } = useGroceryFetch(selectedUrl);

  function handleAddTodoClicked(item) {
    const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
    props.addTask(todoName);
  }

  function handleDropdownChange(e) {
    const newSelectedUrl = e.target.value;
    setSelectedUrl(newSelectedUrl);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Groceries Prices Today</h1>
      <label className="my-4 flex gap-4">
        Get prices from:
        <select
          value={selectedUrl}
          onChange={handleDropdownChange}
          className="border border-gray-300 p-1 rounded-sm"
        >
          <option value="MDN">MDN</option>
          <option value="Liquor store">Liquor store</option>
          <option value="Butcher">Butcher</option>
          <option value="whoknows">Who knows?</option>
        </select>
        {isLoading && <Spinner />}
        {error && <p className="text-red-500">Sorry, something went wrong.</p>}
      </label>
      {groceryData.length > 0 ? (
        <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} />
      ) : !isLoading ? (
        <p className="text-gray-500">No data available</p>
      ) : null}
    </div>
  );
}

function PriceTable({ items, onAddClicked }) {
  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <PriceTableRow
            key={item.name}
            item={item}
            onAddClicked={() => onAddClicked(item)}
          />
        ))}
      </tbody>
    </table>
  );
}

function PriceTableRow({ item, onAddClicked }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <button
          className="italic px-2 rounded-sm border border-gray-300 hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
          onClick={onAddClicked}
        >
          Add to todos
        </button>
      </td>
    </tr>
  );
}
