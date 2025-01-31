<template>
	<div data-test="snippet-generator">
		<form-textarea v-model="originalCode" class="mb-8" type="textarea" data-test="snippet-generator-input">
			Code
		</form-textarea>

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
import { isNonEmptyString } from "@lewishowles/helpers/string";
import { useClipboard } from "@vueuse/core";

const { copy, copied, isSupported } = useClipboard();

// Our original code, provided by the user. This is what we are converting.
const originalCode = ref("");

// Our snippet output. This is the converted code, ready for a snippet JSON
// file.
const snippet = computed(() => {
	if (!isNonEmptyString(originalCode.value)) {
		return "";
	}

	let snippet = originalCode.value;

	// Escape double quotes, unless they're already escaped.
	snippet = snippet.replace(/"/g, "\\\"");

	// Encode tabs
	snippet = snippet.replace(/\t/g, "\\t");

	// Wrap each line with a double quote, where it isn't already done.
	snippet = snippet.split("\n").map(line => `"${line}",`).join("\n");

	return snippet;
});
</script>
