import { describe, it, expect } from 'vitest';
import Time from './Time';

describe('Time component', () => {
	it('renders correctly', () => {
		const { container } = render(<Time />);
		expect(container).toBeInTheDocument();
	});

	it('displays the correct time', () => {
		const { getByText } = render(<Time />);
		expect(getByText(/current time/i)).toBeInTheDocument();
	});
});