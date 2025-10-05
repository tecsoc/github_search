import type { Meta, StoryObj } from "@storybook/nextjs";
import { Chip } from "./Chip";

const meta = {
  component: Chip,
  title: "atoms/Chip",
} satisfies Meta<typeof Chip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    name: "TypeScript",
  },
}

export const JavaScript: Story = {
  args: {
    name: "JavaScript",
  },
}