declare module '*.vue' {
	import Vue from 'vue';
	export default Vue;
}
declare module '*.svg' {
	import {Component} from 'vue';
	const data: Component;
	export default data;
}
declare namespace NodeJS {
	export interface Process {
		isClient: boolean
	}
}
