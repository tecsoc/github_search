import { MantineProvider } from "@mantine/core";
import { Meta, StoryObj } from "@storybook/nextjs";
import RepositoryItem from "./RepositoryItem";

const meta = {
  title: "Home/areas/RepositoryItem",
  component: RepositoryItem,
  args: {
    name: "react",
    owner: "facebook",
    avatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    stargazerCount: 210000,
    primaryLanguage: "TypeScript",
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
]

} satisfies Meta<typeof RepositoryItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const NoLanguage: Story = {
  args: {
    primaryLanguage: "",
  },
}

export const NoAvatar: Story = {
  args: {
    avatarUrl: "",
  },
}

export const NoOwner: Story = {
  args: {
    owner: "",
    avatarUrl: "",
  },
};

export const NoDescription: Story = {
  args: {
    description: ""
  },
};

