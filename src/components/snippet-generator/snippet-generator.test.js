import { createMount } from "@unit/support/mount";
import { describe, expect, test } from "vitest";
import SnippetGenerator from "./snippet-generator.vue";

const mount = createMount(SnippetGenerator);

describe("snippet-generator", () => {
	describe("Initialisation", () => {
		test("should exist as a Vue component", () => {
			const wrapper = mount();

			expect(wrapper.vm).toBeTypeOf("object");
		});
	});

	describe("Computed", () => {
		describe("snippet", () => {
			test("should escape a provided snippet", () => {
				const wrapper = mount();
				const vm = wrapper.vm;

				vm.title = "Your name input";
				vm.prefix = "yni";
				vm.originalCode = "<form-input name=\"your-name\">\n	Your name\n</form-input>";

				expect(vm.snippet).toBe("\"Your name input\": {\n	\"prefix\": \"yni\",\n	\"body\": [\n		\"<form-input name=\\\"your-name\\\">\",\n		\"\\tYour name\",\n		\"</form-input>\",\n	],\n},");
			});
		});
	});
});
