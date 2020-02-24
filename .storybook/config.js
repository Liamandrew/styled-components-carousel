import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});

addDecorator(withA11y);

addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(mdx|[tj]sx?)$/), module);
