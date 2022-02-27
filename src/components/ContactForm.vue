<template>
	<form :action="action" method="POST" accept-charset="UTF-8" @submit.prevent="submit">
		<div class="grid md:grid-cols-2 md:gap-4">
			<div>
				<label class="label" for="email">
					Email
				</label>
				<input v-model="email" class="input" type="email" name="email" placeholder="user@example.com" id="email"
				       required>
			</div>
			<div>
				<label class="label" for="name">
					Name
				</label>
				<input v-model="name" class="input" type="text" name="name" placeholder="John Smith" id="name" required>
			</div>
		</div>
		<div>
			<label class="label" for="message">
				Message
			</label>
			<textarea v-model="message" class="textarea" name="message" id="message" required />
		</div>
		<input type="hidden" name="_gotcha">
		<button class="button" type="submit" :disabled="status === 'submit'">
			<div class="flex">
				<div v-if="status === 'submit'" class="lds-dual-ring" />
				Submit
			</div>
		</button>
		<div v-if="status === 'fail'" class="error border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative"
		     role="alert">
			<strong class="font-bold">Failed to submit</strong>
			<span class="block">
				Something went wrong. Please try again or
				<a :href="'mailto:' + fallback_email" class="border-b border-red-600">email me directly</a>.
			</span>
		</div>
		<div v-if="status === 'success'"
		     class="success border mt-4 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
			<strong class="font-bold">Success!</strong>
		</div>
	</form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ContactForm extends Vue {
	action = process.env.GRIDSOME_FORM_URL!;
	fallback_email = process.env.GRIDSOME_EMAIL!;
	email = '';
	name = '';
	message = '';
	status: '' | 'submit' | 'success' | 'fail' = '';
	changed = false;

	@Watch('email')
	@Watch('name')
	@Watch('message')
	onChange() {
		if (this.changed) return;
		this.changed = true;
		window._paq.push(['trackEvent', 'Contact', 'Touch']);
	}

	async submit() {
		this.status = 'submit';
		try {
			const now = new Date();
			if(now.getFullYear() === 2022 && now.getMonth() === 1) throw new Error('Ran out of Formcarry submissions');
			const res = await fetch(this.action, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify({
					email: this.email,
					name: this.name,
					message: this.message,
				}),
			});
			if (!res.ok) {
				throw new Error('err');
			}
			this.email = '';
			this.name = '';
			this.message = '';
			this.status = 'success';
			window._paq.push(['trackEvent', 'Contact', 'Submit']);
		} catch (e) {
			this.status = 'fail';
		}
	}
}
</script>
<style scoped lang="scss">
.label {
	@apply block text-sm font-bold mb-2;
}

.input {
	@apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
	&:focus {
		@apply ring;
	}

	&:invalid {
		@apply shadow-error;
	}
}

.textarea {
	@apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
	&:focus {
		@apply ring;
	}

	&:invalid {
		@apply shadow-error;
	}

	min-height: 10em;
}

.button {
	@apply bg-ui-primary text-ui-text-inv rounded px-6 py-2.5 font-bold;
	&:disabled {
		cursor: not-allowed;
		opacity: 0.75;
	}
}

.lds-dual-ring {
	$scale-factor: 0.2;
	margin-right: 64px * $scale-factor + 8px;
	margin-bottom: 64px * $scale-factor;
	width: 0;
	height: 64px * $scale-factor * 0.8;
	transform: scale($scale-factor);
}

.lds-dual-ring:after {
	content: " ";
	display: block;
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid theme('colors.ui.text-inv');
	border-color: theme('colors.ui.text-inv') transparent theme('colors.ui.text-inv') transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.error {
	background: #c5303015;
}

.success {
	background: #2f855a15;
}
</style>
