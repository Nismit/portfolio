import type { Meta, StoryObj } from "@storybook/react";
import HeaderComponent from "./";

const meta = {
  title: "Components/Header",
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//   // render: () => <Header />,
// };

export const Header: Story = {};
