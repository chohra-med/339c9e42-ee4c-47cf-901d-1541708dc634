import { render, screen } from '@testing-library/react';

import { BaseTemplate } from '@/templates/BaseTemplate';

// Mock the Header component
describe('BaseTemplate', () => {
  it('renders the children', () => {
    render(
      <BaseTemplate>
        <div>Child Component</div>
      </BaseTemplate>,
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  it('renders the Header component', () => {
    render(
      <BaseTemplate>
        <div />
      </BaseTemplate>,
    );

    const headerComponent = screen.getByTestId('header-component');
    expect(headerComponent).toBeInTheDocument();
  });
});
