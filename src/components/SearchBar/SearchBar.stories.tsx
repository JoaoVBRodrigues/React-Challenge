import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSearch: (filters) => console.log('Search filters triggered:', filters),
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
