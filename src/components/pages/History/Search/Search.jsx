import React, { useState } from "react";
import { Form, Field } from "react-final-form";

const Search = () => {

  const onSubmit = () => {
    return;
  }
  const initialValue = {}
  return (
    <div className="search">
      SEARCH

      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="">
            <Field
              name="search"
              component="input"
              placeholder="Wyszukaj"
            />
            <Field
              name="lastName"
              component="input"
              placeholder="Nazwisko"
            />
          </form>
        )}
      />
    </div>
  )
}

export default Search
