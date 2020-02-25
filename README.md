# Styled Components Carousel

A simple React Carousel component written in Typescript and built with [styled-components](https://github.com/styled-components/styled-components) using React Hooks.

Heavily inspired by [react-slick](https://github.com/akiran/react-slick) with a simplified API and small behaviour changes.

![Alt Text](https://media.giphy.com/media/ge2bPSJZNt8CXMk9Z4/giphy.gif)

## Getting Started

### Prerequisites

This component expects that you will have the following packages installed:
* [styled-components](https://github.com/styled-components/styled-components)
* [react](https://github.com/facebook/react) *minimum version 16.8.6*

### Installation

##### NPM

`npm install styled-components-carousel`

##### Yarn

`yarn add styled-components-carousel`

### Usage

```javascript
import Carousel from 'styled-components-carousel';

const Example = () => (
    <Carousel
        center
        infinite
        showArrows
        showIndicator
        slidesToShow={3}
    >
        <div>
            <span>1</span>
        </div>
        <div>
            <span>2</span>
        </div>
        <div>
            <span>3</span>
        </div>
    </Carousel>
);
```

### Props

| Prop          | Type   | Required | Description                              | Default |
| ------------- | ------ |:--------:| ---------------------------------------- |:-------:|
| center | boolean | No | Should the items be centered? | False |
| infinite | boolean | No | Should the carousel infinitely scroll the items | False |
| showIndicator | boolean | No | Should the bottom item indicator be shown? | True |
| showArrows | boolean | No | Should the side navigation arrows be shown? | True |
| debug | boolean | No | A dev helper prop for debugging development | False |
| slidesToShow  | number | No | The number of slides to show at once. | 1       |
| centerPadding | number | No | Used in conjunction with center property to adding padding to center card | 0 |
| breakpoints | array | No | An array of settings in order to have responsive behaviour for different screen sizes | undefined |

## Development

### Storybook

`yarn storybook`

### Run tests

`yarn test`

### Build

`yarn build`