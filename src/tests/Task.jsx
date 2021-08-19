import React, { useLayoutEffect } from "react";
import { render as reactDomRender, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

export const Task = (props) => {
  useLayoutEffect(() => {
    if (props.test) {
      test(props.component, props.test).then((result) => {
        props.onComplete(result);
      });
    }
  }, [props.test]);

  return (
    <label className="task">
      <input
        id={`task-${props.id}`}
        type="checkbox"
        disabled={true}
        checked={props.completed}
        readOnly={true}
      />
      <label htmlFor={`task-${props.id}`}></label>
      <span>{props.children}</span>
    </label>
  );
};

async function nextTick() {
  await act(() => {
    return Promise.resolve();
  });
}

let pendingTest = Promise.resolve();

async function test(Component, tester) {
  let ctx = document.createElement("div");
  ctx.id = "test";
  document.body.appendChild(ctx);
  act(() => {
    reactDomRender(<Component />, ctx);
  });

  pendingTest = pendingTest.then(() => {
    return new Promise(async (resolve, reject) => {
      await nextTick();

      try {
        let result = await tester(ctx, {
          click,
          findByText: findByText.bind(null, ctx)
        });
        unmountComponentAtNode(ctx);
        document.body.removeChild(ctx);
        resolve(result);
      } catch (e) {
        unmountComponentAtNode(ctx);
        document.body.removeChild(ctx);
        resolve(false);
      }
    });
  });
  return pendingTest;
}

async function click(element) {
  if (element == null) {
    throw new Error("Element cannot be clicked on");
  }
  let rect = element.getBoundingClientRect();

  let options = {
    screenX: rect.left + 5, // Those numbers don't really mean anything.
    screenY: rect.top + 95, // They're just to make the screenX/Y be different of clientX/Y..
    clientX: rect.left + 1,
    clientY: rect.top + 1,
    bubbles: true,
    cancelable: true
  };

  act(() => {
    element.dispatchEvent(new MouseEvent("mousedown", options));
    element.dispatchEvent(new MouseEvent("mouseup", options));
    element.dispatchEvent(new MouseEvent("click", options));
  });

  await nextTick();
}

function findByText(ctx, tagName, text) {
  let elements = document.evaluate(
    `.//${tagName}[contains(., "${text}")]`,
    ctx,
    null,
    XPathResult.ANY_TYPE,
    null
  );
  return elements.iterateNext();
}
