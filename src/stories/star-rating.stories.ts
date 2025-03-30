import StarRating from '@/app/_components/star-rating';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarRating> = {
  title: 'StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ZeroStars: Story = {
  args: {
    rating: 0,
  },
};

export const TwoAndAHalfStars: Story = {
  args: {
    rating: 2.5,
  },
};

export const FiveStars: Story = {
  args: {
    rating: 5,
  },
};
