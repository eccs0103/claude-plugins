# product-vision

Agents follow your product decisions instead of guessing them.

## Install

1. **Get the tools.** You need [Claude Code](https://code.claude.com/docs/en/overview) or the Claude Desktop app with its **Code** tab, and [Node.js](https://nodejs.org) on `PATH`. Without Node.js the skill still works, but every session starts with a hook error and the guard stays off.
2. **Install.** In a Claude Code session, or the prompt box of the Desktop **Code** tab, send:

	```
	/plugin install product-vision --marketplace eccs0103/claude-plugins
	```

	Choose the **user** scope, so it works in every project. On an older Claude Code, send these as two separate prompts instead:

	```
	/plugin marketplace add eccs0103/claude-plugins
	```
	```
	/plugin install product-vision@eccs0103
	```

	In Desktop you can also add the marketplace from **Customize** in the sidebar, then click **+** next to the prompt box and choose **Plugins** to install it.
3. **Restart.** Start a new session. "Loading product decisions..." appears while the plugin's hook runs.
4. **First run.** Open your project folder and ask Claude to "create the product vision". A `docs/product/` folder appears; from the next session on, every agent follows it.

The Desktop **Chat** tab is not supported: it runs no hooks and can't see your project folder.

## How it works

1. **Collect.** Ask Claude for the project's product vision (or run `/product-vision:product-vision`). It reads the project's docs, changelog, git history, agent instruction files and Claude Code memory. It keeps only the decisions a user would notice: who the product is for, what it promises, what it refuses to be, what was dropped and why. How the product is built is left out.
2. **Store.** The decisions land in one folder of standard files:

	```
	docs/product/
		README.md          vision board and the rules in force
		decisions/         one MADR record per decision, with an index
		ROADMAP.md         Now / Next / Later
		GLOSSARY.md        product terms
		CHANGELOG.md       Keep a Changelog: how the vision changed
	```

3. **Guard.** On every session start and every subagent start, the plugin injects `docs/product/README.md` and the decisions index. An agent whose task breaks an accepted decision stops and asks you instead of working around it. Declined ideas stay declined.

Running it again refreshes the folder. Changed decisions get a new record that supersedes the old one; nothing is deleted.
