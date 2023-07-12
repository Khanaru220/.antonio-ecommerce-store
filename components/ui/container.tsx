interface ContainerProps {
	children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		// 'max-w-7xl': limit width of content on very large screens
		<div className="mx-auto max-w-7xl">{children}</div>
	);
};
