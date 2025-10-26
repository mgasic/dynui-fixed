import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Separator } from '../../src/ui/separator';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Separator', () => {
  it('renders with correct ARIA attributes', () => {
    render(<Separator data-testid="test-separator" />);
    const separator = screen.getByTestId('test-separator');
    
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders as a div element', () => {
    render(<Separator data-testid="test-separator" />);
    const separator = screen.getByTestId('test-separator');
    
    expect(separator.tagName).toBe('DIV');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'separator');
  });

  it('applies custom className', () => {
    render(<Separator className="custom-separator" data-testid="test-separator" />);
    const separator = screen.getByTestId('test-separator');
    
    expect(separator).toHaveClass('custom-separator');
  });

  it('passes through additional props', () => {
    render(
      <Separator 
        data-testid="test-separator" 
        id="my-separator"
        style={{ borderColor: 'red' }}
      />
    );
    const separator = screen.getByTestId('test-separator');
    
    expect(separator).toHaveAttribute('id', 'my-separator');
    expect(separator).toHaveStyle({ borderColor: 'red' });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <p>Content before separator</p>
        <Separator aria-label="Section separator" />
        <p>Content after separator</p>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('maintains displayName for development', () => {
    expect(Separator.displayName).toBe('Separator');
  });

  it('works without data-testid prop', () => {
    render(<Separator className="no-testid-separator" />);
    const separator = document.querySelector('.no-testid-separator');
    
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });
});