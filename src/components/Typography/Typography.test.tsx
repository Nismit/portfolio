import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Typography from './index';

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with default span element', () => {
    render(<Typography>Default span</Typography>);
    const element = screen.getByText('Default span');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  it('renders with specified component', () => {
    render(<Typography component="h1">Heading</Typography>);
    const element = screen.getByText('Heading');
    expect(element.tagName.toLowerCase()).toBe('h1');
  });

  it('renders with h2 component', () => {
    render(<Typography component="h2">Subheading</Typography>);
    const element = screen.getByText('Subheading');
    expect(element.tagName.toLowerCase()).toBe('h2');
  });

  it('renders paragraph component', () => {
    render(<Typography component="p">Paragraph text</Typography>);
    const element = screen.getByText('Paragraph text');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('applies className prop', () => {
    render(<Typography className="custom-class">Styled text</Typography>);
    const element = screen.getByText('Styled text');
    expect(element).toHaveClass('custom-class');
  });
});
