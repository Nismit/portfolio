// Set global style into Storybook
import "src/styles.css";

export const parameters = {
  // backgrounds: {
  //   default: "light",
  // },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
