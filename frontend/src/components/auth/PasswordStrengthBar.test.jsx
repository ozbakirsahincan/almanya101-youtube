import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrengthBar from './PasswordStrengthBar';

describe('PasswordStrengthBar', () => {
  test('should render 4 segments', () => {
    const { container } = render(<PasswordStrengthBar password="" />);
    
    const segments = container.querySelectorAll('.flex-1.h-1');
    expect(segments.length).toBe(4);
  });

  test('should show "Enter a password" for empty password', () => {
    render(<PasswordStrengthBar password="" />);
    
    expect(screen.getByText('Enter a password')).toBeInTheDocument();
  });

  test('should show "Weak" message for weak password', () => {
    render(<PasswordStrengthBar password="123456" />);
    
    expect(screen.getByText(/Weak/)).toBeInTheDocument();
  });

  test('should show "Fair" message for fair password', () => {
    render(<PasswordStrengthBar password="1234567890" />);
    
    expect(screen.getByText(/Fair/)).toBeInTheDocument();
  });

  test('should show "Good" message for good password', () => {
    render(<PasswordStrengthBar password="Abcdefghij" />);
    
    expect(screen.getByText(/Good/)).toBeInTheDocument();
  });

  test('should show "Strong" message for strong password', () => {
    render(<PasswordStrengthBar password="Abcdef123!" />);
    
    expect(screen.getByText(/Strong/)).toBeInTheDocument();
  });
});
