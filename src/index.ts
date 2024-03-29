import { Anchor as DefaultAnchor } from "./components/anchor";

const regexp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

export default function linkify(
  text: string,
  Anchor: React.FC<{ key: string; url: string }> = DefaultAnchor,
): Iterable<React.ReactNode> {
  let cursor = 0;
  const planeTextList = [];
  const urlList = [];
  let m: RegExpExecArray | null;
  while ((m = regexp.exec(text))) {
    if (!text) break;
    planeTextList.push(text.slice(cursor, m.index));
    const matchedText = m[0];
    urlList.push(matchedText);
    cursor = m.index! + matchedText.length;
  }
  planeTextList.push(text.slice(cursor, text.length));
  const result: Array<React.ReactNode> = [];
  for (let i = 0; i < planeTextList.length; i++) {
    result.push(planeTextList[i]);
    if (urlList[i]) {
      const url = /^https?:\/\//i.test(urlList[i])
        ? urlList[i]
        : `https://${urlList[i]}`;
      result.push(Anchor({ url, key: `${i}-${url}` })!);
    }
  }
  // exclude undefined
  return result.filter((x) => x);
}
