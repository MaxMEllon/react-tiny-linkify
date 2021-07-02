# react-linkify

> A library convert to anchor tag from text children as react component.

- - -

## Instillation

```
$ npm i react-linkify
```

## Usage

```
import React from 'react'
import linkify from 'react-linkify'

const Example: React.FC<{ children: string }> ({ children }) => (
  <p>{linkify(children)}</p>
)

<Example>
  example: https://example.com
</Example>

/*
 * got: ReactElement
 *   <p>
 *     <a href="https://example.com" / >
 *   </p>
 */
```
