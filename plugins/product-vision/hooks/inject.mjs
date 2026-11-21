"use strict";

import FileSystem from "node:fs/promises";
import Path from "node:path";
import Process from "node:process";

//#region Injection
class Injection {
	static #events = Object.freeze(["SessionStart", "SubagentStart"]);
	static #limit = 9500;

	static #preamble(folder) {
		return [
			`This project's product decisions are binding. They live in ${folder}: the vision and the rules in force are below, and every decision has its own record in decisions/.`,
			"Before you plan, propose or change anything, check the task against these decisions.",
			"- An accepted decision stays as it is. When a task would break one, stop, tell the user which record it breaks (number and title), and ask how to go on.",
			"- A rejected decision is an idea already declined. Leave it out of proposals unless the user raises it.",
			"- A decision changes only when the user says so, recorded as a new record that supersedes the old one (product-vision skill).",
		].join("\n");
	}

	static async #exists(path) {
		try {
			await FileSystem.access(path);
			return true;
		} catch {
			return false;
		}
	}

	static async #find(directory) {
		const candidate = Path.join(directory, "docs", "product");
		if (await Injection.#exists(Path.join(candidate, "README.md"))) return candidate;
		const parent = Path.dirname(directory);
		if (parent === directory) return null;
		return await Injection.#find(parent);
	}

	static async #read(path) {
		if (!await Injection.#exists(path)) return null;
		return await FileSystem.readFile(path, "utf8");
	}

	static #compact(line) {
		if (!line.startsWith("|")) return line;
		return line.replace(/ {2,}/g, " ").replace(/-{4,}/g, "---");
	}

	static #compose(folder, readme, index) {
		const parts = [Injection.#preamble(folder), `--- ${Path.join(folder, "README.md")} ---`, readme.trim()];
		if (index !== null) parts.push(`--- ${Path.join(folder, "decisions", "README.md")} ---`, index.trim());
		const text = parts.join("\n\n").split("\n").map(Injection.#compact).join("\n");
		const limit = Injection.#limit;
		if (text.length <= limit) return text;
		return `${text.slice(0, limit)}\n\n[Cut at ${limit} characters: read the rest in ${folder}]`;
	}

	static async run(event) {
		if (!Injection.#events.includes(event)) throw new TypeError(`Invalid '${event}' hook event`);
		const folder = await Injection.#find(Process.cwd());
		if (folder === null) return;
		const readme = await FileSystem.readFile(Path.join(folder, "README.md"), "utf8");
		const index = await Injection.#read(Path.join(folder, "decisions", "README.md"));
		const output = { hookSpecificOutput: { hookEventName: event, additionalContext: Injection.#compose(folder, readme, index) } };
		Process.stdout.write(JSON.stringify(output));
	}
}
//#endregion

await Injection.run(Process.argv[2]);
