import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { Search } from "../Search";
import { TaskList } from "../../tests/TaskList";
import { TaskTestList } from "../../tests/TaskTestList";
import "./styles.css";

export const MarkdownRenderer = function (props) {
  const history = useHistory();
  const { markdown } = props;

  return (
    <StyledApp>
      <StyledPreview>
        {/* <div style={{ marginBottom: 10 }}>
          <TaskList
            taskNumber={1}
            component={Search}
            tasks={TaskTestList}
          ></TaskList>
        </div> */}
        <button onClick={() => history.push("/app")}>Go To App</button>
        <ReactMarkdown source={markdown} />
      </StyledPreview>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  div {
    flex: 1;
    padding: 10px;
  }
`;

const StyledPreview = styled.div`
  background: #f8f8f8;

  pre {
    background: #333;
    color: #eee;
    padding: 30px;
  }
`;
