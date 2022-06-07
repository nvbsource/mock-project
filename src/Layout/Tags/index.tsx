import React, { Fragment } from "react";
export interface TagsState {
  data: string[];
  handleAddTag: any;
}
export default function Tags({ data, handleAddTag }: TagsState) {
  return (
    <Fragment>
      {data.map((item, index) => (
        <span key={index} className="tags-item tags-color" onClick={() => handleAddTag(item)}>
          {item}
        </span>
      ))}
    </Fragment>
  );
}
