import { describe, it, expect } from 'vitest';
import Info from './Info';

describe('Info Component', () => {
	it('renders correctly', () => {
		const { container } = render(<Info />);
		expect(container).toBeInTheDocument();
	});

	it('displays the correct text', () => {
		const { getByText } = render(<Info />);
		expect(getByText('Expected Text')).toBeInTheDocument();
	});
});