import React from "react";
import assert from "assert";
import ReactDOM from "react-dom/server";
import linkfy from "../index";

const txt = "xxx\nfaq.xxxxxxxx.jp/xx/xx/xxxxxxxx/xxxxxxxxxxxx\n\n\n--------\n\n[2021/03/24]　xxx\nyyy\n"


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
  [
    "sample HtTp://google.com contents",
    '<p>sample <a href="HtTp://google.com">HtTp://google.com</a> contents</p>',
    [
      "sample ",
      {
        href: "HtTp://google.com",
        children: "HtTp://google.com",
      },
      " contents",
    ],
  ],
  [
    txt,
    '<p>xxx\n<a href="https://faq.xxxxxxxx.jp/xx/xx/xxxxxxxx/xxxxxxxxxxxx">https://faq.xxxxxxxx.jp/xx/xx/xxxxxxxx/xxxxxxxxxxxx</a>\n\n\n--------\n\n[2021/03/24]　xxx\nyyy\n</p>',
    [
      "xxx\n",
      {
        href: "https://faq.xxxxxxxx.jp/xx/xx/xxxxxxxx/xxxxxxxxxxxx",
        children: "https://faq.xxxxxxxx.jp/xx/xx/xxxxxxxx/xxxxxxxxxxxx"
      },
      "\n\n\n--------\n\n[2021/03/24]　xxx\nyyy\n"
    ]
  ],
  [
    "💢 http://example.com 💢 http://example.com",
    '<p>💢 <a href="http://example.com">http://example.com</a> 💢 <a href="http://example.com">http://example.com</a></p>',
    [
      "💢 ",
      {
        href: "http://example.com",
        children: "http://example.com",
      },
      " 💢 ",
      {
        href: "http://example.com",
        children: "http://example.com",
      },
    ],
  ],
] as const)(
  'linkify("%s") \n -> expected %s',
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
