# product-vision

Agents follow your product decisions instead of guessing them.

```
/plugin marketplace add eccs0103/claude-plugins
/plugin install product-vision@eccs0103
```

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

The hook needs Node.js on `PATH`.
