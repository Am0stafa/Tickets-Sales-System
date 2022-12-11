# React Search Panel

A react search panel that expands, autocompletes, and support single or multi select.

## Demo

![React Search Panel](https://jeremydavidson.github.io/react-search-panel/react-search-panel-demo.gif)

There is a [demonstration of react-search-panel](https://jeremydavidson.github.io/react-search-panel/demo) as coded in the `example` folder.

Many other variants of this component are demonstrated in this [Storybook demonstration](https://jeremydavidson.github.io/react-search-panel/storybook).

## Documentation

Here is [documentation of the component API](https://jeremydavidson.github.io/react-search-panel/doc).

## Getting started

### For development

1. `npm install --save-dev react-search-panel`

### Run example locally

1. `git clone https://github.com/jeremydavidson/react-search-panel`
1. `cd example`
1. `npm install`
1. `npm start`

## Usage

### Typescript example

This is an example in Typescript with all available props:

```tsx
import React from "react";
import { SearchPanel } from "react-search-panel";

const App = () => {
  const [input, setInput] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);
  return (
    <SearchPanel
      chips
      choices={choices}
      float
      maximumHeight={250}
      onChange={event => setInput((event as React.ChangeEvent<HTMLInputElement>).target.value)}
      onClear={() => setInput("")}
      onFocus={event => handleFocus((event as React.FocusEvent<HTMLInputElement>).target.value)}
      onSelectionChange={setSelectedChoices}
      noChoiceItem={noChoiceItem}
      placeholder="Search"
      selectedChoices={selectedChoices}
      shadow
      small
      value={input}
      variant={SearchPanelVariant.checkbox}
      width={300}
    />
  );
}
export default App;
```

### Javascript

This is an example in Javascript with only the required props.

```jsx
import React from "react";
import { SearchPanel } from "react-search-panel";

const App = () => {
  const [input, setInput] = React.useState("");
  const [selectedChoices, setSelectedChoices] = useState(choices);
  return (
    <SearchPanel
      choices={choices}
      onChange={event => setInput(event.target.value)}
      onSelectionChange={setSelectedChoices}
      placeholder="Search"
      selectedChoices={selectedChoices}
      value={input}
    />
  );
}
export default App;
```
