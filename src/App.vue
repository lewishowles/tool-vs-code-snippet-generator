<template>
	<div class="px-8 py-12 md:px-24 md:py-20 flex flex-col items-start">
		<div class="page-title flex flex-col gap-2 md:flex-row md:items-center md:gap-4 mb-8">
			<icon-code class="page-title__icon p-5 rounded-full size-16 shrink-0" />

			<h1 class="flex flex-col gap-2 md:gap-0">
				<span class="text-5xl font-bold text-white">Snippet generator</span>
				<small class="text-xl font-normal text-yellow-100 flex items-baseline gap-4">
					for Visual Studio Code
					<div class="flex-grow h-px bg-yellow-100 -translate-y-1" />
				</small>
			</h1>
		</div>

		<div class="w-full grid md:grid-cols-3 gap-8 md:gap-24">
			<div class="prose prose-invert">
				<p>This tool aims to simplify the process of converting a block of code into something that can be used in a VS Code snippet file, which is often a laborious process.</p>

				<p>Please note that this is designed as a time-saving tool, and as such it will simply escape input and add the appropriate template structure. If code is already partially formatted, you may not get expected results.</p>
			</div>

			<snippet-generator />
		</div>
	</div>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";

import SnippetGenerator from "@/components/snippet-generator/snippet-generator.vue";

useColorMode({ storageKey: "howles:snippet-generator:colour-scheme", disableTransition: false, initialValue: "dark" });
</script>

<style>
.page-title {
	--fade-in-end: 0.8;

	position: relative;

	&:before {
		background: radial-gradient(ellipse at center, var(--color-neon-pink), transparent 70%);
		content: "";
		height: 20rem;
		left: 0;
		max-width: 100%;
		position: absolute;
		top: -14rem;
		opacity: 0.5;
		width: 100%;
		z-index: -1;
	}
}

.page-title__icon {
	background-image: linear-gradient(to bottom, color-mix(in oklab, var(--color-neon-pink), white 30%), var(--color-neon-pink) 50%);
	box-shadow: inset 0 0 0 2px var(--color-neon-pink), 0 0 32px var(--color-neon-pink), 0 4px 0 0 var(--color-pink-900);
}
</style>
