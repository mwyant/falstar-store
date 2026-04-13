import books from '$lib/data/books.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const book = books.find((b) => b.id === params.id);

	if (!book) {
		throw error(404, 'Project file not found in databank.');
	}

	return {
		book
	};
}

export const prerender = true;
export function entries() {
	return books.map((book) => ({ id: book.id }));
}
