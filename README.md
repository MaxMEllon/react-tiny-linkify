# react-tiny-linkify

> A library convert to anchor tag from text children as react component.

- very tiny
- simple usage
- so simple

- - -

## Instillation

```
$ npm i react-tiny-linkify
```

## Usage

```jsx
import React from 'react'
import linkify from 'react-tiny-linkify'

const Example: React.FC<{ children: string }> = ({ children }) => (
  <p>{linkify(children)}</p>
)

const element = (
  <Example>
    example: https://example.com
  </Example>
)

/*
 * got: ReactElement
 *   <p>
 *     example: <a href="https://example.com">https://example.com</a>
 *   </p>
 */
```

- with memo

```jsx
const Example: React.FC<{ content: string }> = ({ content }) => {
  const linked = useMemo(() => linkify(content), [content])
  return (
    <p>{linked}</p>
  )
}
```
