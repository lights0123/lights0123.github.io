declare module '*.vue' {
	import Vue from 'vue';
	import 'vue-router';
	import 'vue-meta';
	export default Vue;
}
declare module '*.svg' {
	import { Component } from 'vue';
	const data: Component;
	export default data;
}
declare namespace NodeJS {
	export interface Process {
		isClient: boolean
	}
}

interface Window {
	_paq: {
		push(event: string[]): void
	},
}
