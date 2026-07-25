import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  render: function PaginationWithState(args) {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  render: function PaginationMiddle(args) {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};
