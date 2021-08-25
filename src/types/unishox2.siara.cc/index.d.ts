declare module 'unishox2.siara.cc' {
	export function unishox2_compress_simple(
		input: string | number[],
		length: number,
		out: Uint8Array
	): number;
	export function unishox2_decompress_simple(
		input: Uint8Array,
		length: number
	): string;
}
