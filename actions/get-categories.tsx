import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
	// (default) this fetching will be cached
	// - if server update new things, we can't get it immediately
	// Nextjs support 'revalidate' to control cache
	// How it looks in console:
	/*┌ GET /?_rsc=1emr1 200 in 74ms
	│
	└──── GET http://localhost:3000/api/2632689c-36a4-4509-.. 200 in 1ms (cache: HIT) */
	const res = await fetch(URL, { cache: 'no-cache' });

	return res.json();
};
