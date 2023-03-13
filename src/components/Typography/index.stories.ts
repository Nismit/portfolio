import type { Meta, StoryObj } from "@storybook/react";
import TypographyComponent from ".";

const meta = {
  title: "Components/Typography",
  component: TypographyComponent,
  argTypes: {
    component: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "blockquote",
        "em",
        "strong",
        "b",
      ],
    },
    variant: {
      control: "select",
      options: ["headline", "subHeadline", "body", "title", "description"],
    },
  },
} satisfies Meta<typeof TypographyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Typography",
  },
};

export const Aligned: Story = {
  args: {
    children: "Typography",
    component: "p",
    align: "center",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["center", "left", "right", "justify", "inherit"],
    },
  },
};

export const WithMargin: Story = {
  args: {
    children: "Typography",
    component: "p",
    margin: [10, 0, 0, 0],
    variant: "body",
  },
};

export const Color: Story = {
  args: {
    children: "Typography",
    component: "p",
    variant: "body",
  },
  argTypes: {
    color: {
      control: "color",
    },
  },
};
