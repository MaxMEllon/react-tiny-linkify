import React from "react";
import assert from "assert";
import ReactDOM from "react-dom/server";
import linkfy from "../index";

describe.each([
  [
    "sample http://google.com contents",
    '<p>sample <a href="http://google.com">http://google.com</a> contents</p>',
    [
      "sample ",
      {
        href: "http://google.com",
        children: "http://google.com",
      },
      " contents",
    ],
  ],
] as const)(
  "linkify(%s) expected (%s)",
  (input, expectedString, expectedProps) => {
    it(`input: ${input}, expected: ${expectedString}`, () => {
      const linked = linkfy(input);
      const actual = ReactDOM.renderToStaticMarkup(
        React.createElement("p", {}, linked),
      );
      assert.strictEqual(actual, expectedString);
      linked.forEach((element, idx) => {
        if (typeof element === "object") {
          // anchor component case
          assert.deepStrictEqual(element.props, expectedProps[idx]);
        } else {
          // plane text case
          assert.strictEqual(element, expectedProps[idx]);
        }
      });
    });
  },
);
