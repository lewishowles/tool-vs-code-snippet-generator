import SnippetGenerator from "./snippet-generator.vue";
import { createMount } from "@cypress/support/mount";

const mount = createMount(SnippetGenerator);

describe("snippet-generator", () => {
	it("Renders a component", () => {
		mount();

		cy.getByData("snippet-generator").shouldBeVisible();
	});

	it("Code is escaped", () => {
		mount();

		cy.fillFormField("snippet-generator-input", "<form-input name=\"your-name\">\n	Your name\n</form-input>");

		cy.getByData("snippet-generator-output").shouldHaveText("\"Your name input\": {\n	\"prefix\": \"yni\",\n	\"body\": [\n		\"<form-input name=\\\"your-name\\\">\",\n		\"\\tYour name\",\n		\"</form-input>\",\n	],\n},");
	});
});
