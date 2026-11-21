# Sources and detectors

Read every source below, in this order. Earlier sources outrank later ones when they disagree. Within one source, the newest dated statement wins.

## Source inventory

| #   | Source                         | Where to look                                                                                                                                                                                                                                                       |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Agent memory                   | Claude Code project memory: `~/.claude/projects/<slug>/memory/` (slug = the project's absolute path with every character that is not a letter or digit turned into `-`). Start at its `MEMORY.md` index, then read every file it lists, then any remaining files.   |
| 2   | Agent instruction files        | `CLAUDE.md`, `CLAUDE.local.md`, `.claude/CLAUDE.md`, `AGENTS.md` (every level), `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `.cursorrules`, `.windsurfrules`, `.clinerules`, `.kiro/steering/`, `.specify/memory/constitution.md`, `agent-os/product/` |
| 3   | Human docs                     | `README*`, `CONTRIBUTING*`, `ROADMAP*`, `docs/**`, `LICENSE*`, `SECURITY*`, `CODE_OF_CONDUCT*`, `PRIVACY*`, `TERMS*`, root planning or status notes (`PLAN*`, `STATUS*`, `START-HERE*`, `VISION*`)                                                                    |
| 4   | Existing decision logs         | `docs/adr/`, `docs/decisions/`, `doc/adr/`, `adr/`, `decisions/`, `architecture/decisions/`. **Link them; never copy.**                                                                                                                                            |
| 5   | History notes                  | `CHANGELOG*`, `HISTORY*`, `RELEASES*`, `NEWS*`, release notes                                                                                                                                                                                                      |
| 6   | Manifests and store text       | Package manifest name, description, keywords, `private`, license (`package.json`, `*.csproj`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `composer.json`, `*.gemspec`), web manifest, store listing, the page `<title>`                                              |
| 7   | Product surface                | What users see and choose: UI text and locale files, settings and their defaults, modes and hidden flags (query parameters, feature flags), "unavailable" or error messages, help or onboarding pages, the kinds of items outside authors are invited to add          |
| 8   | Git (dates and endings only)   | First commit date, tags, branches named `archive/*`, `legacy/*` or `old/*`, reverts, deleted feature folders (`git log --diff-filter=D --name-only`). Commit subjects are often bare version numbers; take meaning from the changelog instead                       |
| 9   | Issue tracker (when reachable) | Feature requests, and issues closed as "won't fix" (declined ideas)                                                                                                                                                                                                 |

## Promise detectors

Each signal points to a kind of product decision. Phrase what you find in user words.

| Signal                                                                                                                                                                                                | Product decision it points to                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A contributor guide, or a docs section, addressed to outside authors of one kind of item (themes, levels, widgets, integrations), with an example item                                          | **Openness:** "anyone can add a new <item> by writing one file, without touching the rest of the product". Confirm with: the items sit side by side with one shape, and adding one needs no core edit |
| Same-shaped items users pick from (modes, themes, levels, voices)                                                                                                                                     | A catalogue the product offers. Check whether users may add their own                                                                                                                         |
| Something every user shares: a global score, one shared opponent, a public feed, a leaderboard                                                                                                        | A core promise: the experience is collective, not single-user                                                                                                                                 |
| "never", "always", "must", "only" or "no" about what users see, keep or decide                                                                                                                        | An experience rule (for example: nothing changes without the user's consent; a missing part is shown as unavailable instead of silently worse)                                                 |
| A feature removed in the changelog, an archive branch, a reverted feature                                                                                                                             | `deprecated` if it once shipped, `rejected` if it never did. Give the reason when a source gives one                                                                                         |
| An idea a source calls declined, too risky or "do not propose again"                                                                                                                                  | `rejected`                                                                                                                                                                                      |
| A mode or flag for one group (developers, beta, admins)                                                                                                                                               | An audience split: who sees what                                                                                                                                                                |
| A stated budget or refused cost ("free tier only", "no paid X")                                                                                                                                       | A business constraint the product lives within                                                                                                                                                  |
| A license, "open source", contribution invitations                                                                                                                                                    | Openness and license                                                                                                                                                                            |
| Who the README addresses (players, visitors, developers, operators, staff)                                                                                                                            | Target users                                                                                                                                                                                    |
| A time or effort target for users ("playable in seconds", "one-minute setup")                                                                                                                         | An experience rule                                                                                                                                                                              |
| A sibling project that feeds or consumes this one                                                                                                                                                     | A relation, written as what users get from it                                                                                                                                                   |

**Products with no screen** (services, libraries, CLIs): the users are the callers, integrators and operators.

1. Keep the promises they rely on as **outcomes**: what problem it solves, for whom, "a reward is granted at most once", "upgrades within a major version never break callers", "nothing extra to install".
2. Drop the **mechanism**: the protocol, transport, security scheme, limits, error format, method signatures, and how a method behaves on bad input.

If a library record names one of its own types or methods, it is a mechanism.

## Traps

| Trap                                                                                      | Guard                                                                                                     |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| One word names two things (a `plugins/` folder may hold build tooling, not user add-ons)   | Decide from who the item is for, never from its name                                                      |
| Agent memory mixes product rules with work rules (how to commit, code style, tone)         | Keep only what a user would notice                                                                        |
| A README describes an older product                                                       | Compare with changelog dates; the newer source wins                                                       |
| A note was later overruled                                                                | Take the newest dated statement; the old one becomes evidence for `superseded` or `deprecated`            |
| A plan or idea read as a decision                                                         | Undecided items are `proposed` or go to `ROADMAP.md`, never `accepted`                                    |

## Candidate row

Every collector returns its findings in exactly this table shape, one row per candidate:

| Decision (user words) | Kind | Status | Date | Evidence | Stated or Inferred | Private |
| --------------------- | ---- | ------ | ---- | -------- | ------------------ | ------- |

| Column             | Meaning                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Kind               | vision, users, need, promise, openness, experience, business, non-goal, direction or term                                  |
| Status             | accepted, rejected, deprecated or proposed                                                                                 |
| Date               | `YYYY-MM-DD` of the earliest evidence, else `unknown`                                                                      |
| Evidence           | `path:line`, a commit hash, a changelog version, or `agent memory (local)`                                                 |
| Stated or Inferred | Stated when a source says it in words, Inferred when it was derived from a pattern                                         |
| Private            | `yes` when the only evidence is private (agent memory, local notes), else `no`                                             |

Then one line listing the sources found absent.
