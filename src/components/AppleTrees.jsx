import React from "react";
import {NavLink, Outlet, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function AppleTrees(props) {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      {props.loading && <div>A moment please...</div>}
      {props.error && (
        <div>{`There is a problem fetching the post data - ${props.error}`}</div>
      )}
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {props.data && props.data
          .filter((appleTree) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let variety = appleTree.variety.toLowerCase();
            return variety.startsWith(filter.toLowerCase());
          })
          .map((appleTree) => (
            <div className="row">
            <button onClick={() => props.onAdd(appleTree)} className="add-button">+</button>
            <QueryNavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/${appleTree.variety}`}
            key={appleTree.variety}
          >
            {appleTree.variety}
          </QueryNavLink>
            </div>
          
        ))}
      </nav>
      <Outlet />
    </div>
  );
}