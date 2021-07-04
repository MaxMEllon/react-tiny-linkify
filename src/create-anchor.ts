import React from "react";

export const Anchor: React.VFC<{ url: string; key: string }> = ({
  url,
  key,
}: {
  url: string;
  key: string;
}) => {
  return React.createElement(
    "a",
    {
      key,
      href: url,
    },
    url,
  );
};
