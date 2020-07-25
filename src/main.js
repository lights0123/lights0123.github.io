// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// import '@openfonts/cantarell_latin';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '@/assets/main.scss';
import '@/theme';
import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue) {
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout);
}
