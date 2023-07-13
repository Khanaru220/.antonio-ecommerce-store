'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';

interface FilterProps {
	data: (Size | Color)[];
	name: string;
	valueKey: string;
}

export const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
	// data: array of sizes or colors - for available options
	// name: for UI only
	// valueKey: (to get/generate query params)
	const searchParams = useSearchParams();
	const router = useRouter();

	const selectedValue = searchParams.get(valueKey);

	const onClick = (id: string) => {
		// add new filter to current URL's query params
		const current = qs.parse(searchParams.toString());

		const query = {
			...current,
			[valueKey]: id,
		};

		if (current[valueKey] === id) {
			// user click same filter field again, remove it from query params
			query[valueKey] = null;
		}

		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipNull: true }
		);

		router.push(url);
	};

	console.log(data);
	return (
		<div className="mb-8">
			<h3 className="text-lg font-semibold">{name}</h3>
			<hr className="my-4" />
			<div className="flex flex-wrap gap-2">
				{data.map((filter) => (
					<div key={filter.id} className="flex items-center">
						<Button
							className={cn(
								'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
								selectedValue === filter.id && 'bg-black text-white'
							)}
							onClick={() => onClick(filter.id)}
						>
							{filter.name}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};
