/**
 * Internal dependencies
 */
import { isItemValid } from '../validation';
import type { Field } from '../types';

describe( 'validation', () => {
	it( 'fields not visible in form are not validated', () => {
		const item = { id: 1, valid_order: 2, invalid_order: 'd' };
		const fields: Field< {} >[] = [
			{
				id: 'valid_order',
				type: 'integer',
			},
			{
				id: 'invalid_order',
				type: 'integer',
			},
		];
		const form = { visibleFields: [ 'valid_order' ] };
		const result = isItemValid( item, fields, form );
		expect( result ).toBe( true );
	} );

	it( 'integer field is valid if value is integer', () => {
		const item = { id: 1, order: 2, title: 'hi' };
		const fields: Field< {} >[] = [
			{
				type: 'integer',
				id: 'order',
			},
		];
		const form = { visibleFields: [ 'order' ] };
		const result = isItemValid( item, fields, form );
		expect( result ).toBe( true );
	} );

	it( 'integer field is invalid if value is not integer', () => {
		const item = { id: 1, order: 'd' };
		const fields: Field< {} >[] = [
			{
				id: 'order',
				type: 'integer',
			},
		];
		const form = { visibleFields: [ 'order' ] };
		const result = isItemValid( item, fields, form );
		expect( result ).toBe( false );
	} );

	it( 'integer field is invalid if value is empty', () => {
		const item = { id: 1, order: '' };
		const fields: Field< {} >[] = [
			{
				id: 'order',
				type: 'integer',
			},
		];
		const form = { visibleFields: [ 'order' ] };
		const result = isItemValid( item, fields, form );
		expect( result ).toBe( false );
	} );

	it( 'field is invalid if value is not one of the elements', () => {
		const item = { id: 1, author: 3 };
		const fields: Field< {} >[] = [
			{
				id: 'author',
				type: 'integer',
				elements: [
					{ value: 1, label: 'Jane' },
					{ value: 2, label: 'John' },
				],
			},
		];
		const form = { visibleFields: [ 'author' ] };
		const result = isItemValid( item, fields, form );
		expect( result ).toBe( false );
	} );
} );
