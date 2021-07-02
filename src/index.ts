import React from "react";

const regexp =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

export default function linkify(
  text: string,
): React.ReactElement<{ children: React.ReactChild[] }> {
  let cursor = 0;
  const planeTextList = [];
  const urlList = [];
  let m: RegExpExecArray | null;
  while ((m = regexp.exec(text))) {
    planeTextList.push(text.slice(cursor, m.index));
    const matchedText = m[0];
    urlList.push(matchedText);
    cursor = m.index! + matchedText.length;
  }
  planeTextList.push(text.slice(cursor, text.length));
  const result: React.ReactChild[] = [];
  for (let i = 0; i < planeTextList.length; i++) {
    result.push(planeTextList[i]);
    if (urlList[i]) {
      result.push(
        React.createElement(
          "a",
          {
            key: `${i}-${urlList}`,
            href: urlList[i],
          },
          urlList[i],
        ),
      );
    }
  }
  return React.createElement(React.Fragment, { children: result });
}
