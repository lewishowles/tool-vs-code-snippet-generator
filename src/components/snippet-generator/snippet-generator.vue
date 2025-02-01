<template>
	<div data-test="snippet-generator">
		<form-layout>
			<form-field v-model="title">
				Title
			</form-field>

			<form-field v-model="prefix">
				Prefix

				<template #help>
					For multiple prefixes, please comma separate them.
				</template>
			</form-field>

			<form-field v-model="originalCode" type="textarea" class="mb-8" data-test="snippet-generator-input">
				Code
			</form-field>
		</form-layout>

		<ui-button v-if="isSupported" class="button--muted relative mb-8" @click="copy(snippet)">
			<span :class="{ 'invisible': copied }">
				Copy snippet
			</span>

			<span v-show="copied" class="button-padding-y animate-fade-in-up absolute inset-0 text-center" v-bind="{ 'aria-hidden': copied ? null : true }">
				Copied
			</span>
		</ui-button>

		<pre data-test="snippet-generator-output">{{ snippet }}</pre>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useClipboard } from "@vueuse/core";

const { copy, copied, isSupported } = useClipboard();

// The title of this snippet
const title = ref("");
// The prefix text to activate this snippet.
const prefix = ref("");
// Our original code, provided by the user. This is what we are converting.
const originalCode = ref("");

// Our snippet output. This is the converted code, ready for a snippet JSON
// file.
const snippet = computed(() => {
	let body = originalCode.value;

	// Escape double quotes, unless they're already escaped.
	body = body.replace(/"/g, "\\\"");

	// Encode tabs
	body = body.replace(/\t/g, "\\t");

	// Wrap each line with a double quote, where it isn't already done.
	body = body.split("\n").map(line => `		"${line}",`).join("\n");

	// Define our prefixes, depending on if there are one or more.
	const prefixList = prefix.value.split(",").map(p => p.trim());
	const prefixValue = prefixList.length > 1 ? `[${prefixList.map(p => `"${p}"`).join(", ")}]` : `"${prefixList[0]}"`;

	return [
		`"${title.value}": {`,
		`	"prefix": ${prefixValue},`,
		"	\"body\": [",
		body,
		"	],",
		"},",
	].join("\n");
});
</script>
