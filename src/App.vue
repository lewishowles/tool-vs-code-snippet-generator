<template>
	<div class="max-w-xl mx-auto flex flex-col gap-8 py-20">
		<div>
			<h1 class="mb-4">
				<span class="bg-gradient-to-br from-purple-800 to-pink-800 bg-clip-text text-5xl font-bold text-transparent">Snippet generator</span>
				<small class="block text-lg font-normal">for Visual Studio Code</small>
			</h1>

			<p>The process of changing code to something that can be pasted into a VSCode snippet file can be laborious. This tool aims to simplify that process, by quickly formatting a block of code as necessary.</p>
		</div>

		<alert-message>
			<template #title>
				Please note
			</template>

			<template #icon>
				<icon-info />
			</template>

			This is designed as a time-saving tool, and as such I don't try to do anything too clever here. If code is already partially escaped you may not get the expected outcome.
		</alert-message>

		<snippet-generator />
	</div>
</template>

<script setup>
import SnippetGenerator from "@/components/snippet-generator/snippet-generator.vue";
</script>
