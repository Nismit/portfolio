import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectInformation from './index';

describe('ProjectInformation', () => {
  it('renders client, stack, and role information', () => {
    render(
      <ProjectInformation client="Test Client" stack="React, TypeScript" projectRole="Full-stack" />
    );

    expect(screen.getByText('Client')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('React, TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Full-stack')).toBeInTheDocument();
  });

  it('uses default role when not provided', () => {
    render(<ProjectInformation client="Another Client" stack="Next.js" />);

    expect(screen.getByText('Front-end')).toBeInTheDocument();
  });

  it('renders all three sections', () => {
    render(<ProjectInformation client="Acme Corp" stack="Vue, Nuxt" projectRole="Designer" />);

    // Check that all section labels exist
    expect(screen.getByText('Client')).toBeInTheDocument();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });
});
