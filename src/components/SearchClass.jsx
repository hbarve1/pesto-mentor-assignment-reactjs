import React from "react";
import results from "../data/results";
import { CheckIcon } from "./CheckIcon";
import { ContentType } from "./ContentType";
import { ModifiedAt } from "./ModifiedAt";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selection: { 0: true } };
  }

  render() {
    return (
      <main>
        <header>
          <button className="previous">Previous Page</button>
          <button className="next">Next Page</button>
        </header>
        <ul>
          {results.map((result, index) => {
            return (
              <li
                key={index}
                className={this.state.selection[index] ? "selected" : ""}
              >
                <input
                  id={`search-${index}`}
                  tabIndex="0"
                  type="checkbox"
                  checked={this.state.selection[index]}
                />
                <label htmlFor={`search-${index}`} className="checkbox"></label>
                <div className="thumbnail">
                  <img src="https://www.thehairpin.com/wp-content/uploads/2011/01/0dVOZPKzES40OrMqJ.jpg" />
                </div>

                <div className="info">
                  <h3>{result.hed || result.name}</h3>
                  <span className="publish-status">
                    <span className="icon">
                      <CheckIcon />
                    </span>
                    Published
                  </span>
                  <span className="type">
                    <ContentType collection={result.collection} />
                  </span>
                  {result.channel && (
                    <span className="channel">{result.channel}</span>
                  )}
                  <span className="modified-at">
                    <ModifiedAt
                      date={new Date(Date.parse(result.modifiedAt))}
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}
