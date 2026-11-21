---
name: product-vision
description: Use when the user asks for a project's product vision, product decisions, "product-vision", what the product promises or must never become, or to create, refresh or check docs/product/; also when a product decision is made, changed or rejected in conversation and should be recorded.
---

# Product vision

Collects a project's **product decisions** into one folder, `docs/product/`, built only from standard files. The plugin's hooks inject that folder into every session and every subagent, so no agent plans against it.

A product decision is a promise about what the product is and does for people. How it is built is engineering, and engineering stays out.

## The box test

A product decision is a line you could print on the product's **box**: its landing page, store listing or promise to users. A candidate passes only when both hold:

1. **Users would notice** if it changed. Users here means customers, visitors, players, contributors, or the callers of a service or library.
2. **It reads in user words and names no mechanism.** That rules out code names (classes, methods, fields, files), languages, libraries, protocols, formats, algorithms, thresholds and internal steps.

A candidate that fails rule 2 is rewritten as the outcome the user gets, with the mechanism moved to *Evidence*. If no outcome is left, drop it. For example, "sync uses WebSockets with no polling fallback" becomes "when the connection drops, the app says so and keeps working offline".

| Passes the box test                                                                                          | Fails it (dropped, or evidence only)                                        |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Who it is for, what it promises, what it refuses to be                                                       | Stack, architecture, folder layout, API shape, method behaviour             |
| Openness: who may extend it and how little they must touch ("anyone adds a theme by writing one file")       | How the extension point is coded or registered                              |
| Experience rules: first-visit length, nothing changes without asking, what users see when a part is missing  | Performance targets, model metrics, rate caps, error formats, retries       |
| Business: free or paid, price, license, the budget the product lives within, where it is offered             | Security mechanisms, request limits, hosting and deploy configuration       |
| Features removed and ideas declined, and why                                                                 | Refactors, renames, migrations, bug fixes, technical debt                   |
| Direction: what comes next, what waits                                                                       | Work rules for agents or the team: who approves, what to ask, how to commit |

A product with many rules is still described in **few** records. Merge rules that serve one promise into one record, and keep the record's title in user words.

## Steps

1. **Locate.** Find the project root (the git root, else the working directory) and check for an existing `docs/product/`. Existing folder → this run is a **refresh**: read every file in it first.
   **Done when** you know the root, and whether this is a new run or a refresh.

2. **Collect.** Gather candidates from every source in [sources.md](references/sources.md), in its order. Below about 200 files and 100 commits, collect inline. Above that, dispatch three Explore subagents in parallel: (a) agent memory, instruction files and human docs; (b) changelog and git history; (c) the product surface. Each gets the path of `references/sources.md` and returns rows in its *Candidate row* shape.
   **Done when** every row of the source inventory is marked read or absent, with the path.

3. **Filter.** Run the box test on every candidate. Merge duplicates and keep the strongest evidence for each. Mark each one:
   - **Stated**: a source says it in words.
   - **Inferred**: you derived it from a pattern.

   An existing decision log in the project (ADR, MADR, a `decisions/` folder) is linked, never copied.
   **Done when** each kept candidate has a status (accepted, rejected, deprecated, proposed), a date or "unknown", at least one evidence line, and Stated or Inferred.

4. **Write.** Produce the folder exactly as [formats.md](references/formats.md) shows: `README.md`, `decisions/README.md`, one MADR record per decision, `CHANGELOG.md`; `ROADMAP.md` and `GLOSSARY.md` only when they have content.
   Keep `README.md` plus the decisions index under 8,000 characters, because the hooks inject both. On a refresh, follow *Refresh* below.
   **Done when** every kept candidate is a record, every accepted record is reachable from the README's *Rules in force*, and the size budget holds.

5. **Report.** Reply with:
   1. a table of the decisions: number, title, status, Stated or Inferred;
   2. the sources marked absent;
   3. every line taken from a private source, so the user can strike it before committing;
   4. one offer: add a short `AGENTS.md` section pointing at `docs/product/` for agents other than Claude Code.

   Change nothing outside `docs/product/` without the user's yes.

## Private sources

Agent memory, local notes and chat history are private, while `docs/product/` is committed and may be public. A decision from a private source is written in neutral product words. It never contains:

1. quotes,
2. people's names,
3. one person's money, machine or schedule,
4. local paths.

Its evidence line reads `agent memory (local)` or `local notes`.

## Refresh

1. A record whose decision still holds stays untouched.
2. A changed decision gets a **new** record; the old one becomes `superseded by NNNN`.
3. A decision the project no longer keeps becomes `deprecated`, with the evidence of its end.
4. No record file is ever deleted or renumbered.
5. Add one `CHANGELOG.md` entry for the run: Added, Changed, Deprecated, Removed, each line naming its record.

## Recording a decision from conversation

When the user makes, changes or declines a product decision in chat:

1. Write one new record. Declined ideas become `rejected`.
2. Update the index and the README's *Rules in force*.
3. Add a `CHANGELOG.md` line.

This takes no scan.

## Common mistakes

| Mistake                                                                    | Instead                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Searching for a word ("plugin", "vision") and trusting the hit             | Read who the docs speak to and what users can do; one word may name a build tool            |
| Writing the stack, architecture, API shape or limits as decisions          | The box test; such facts may only be evidence                                               |
| A record per rule, 15 or more records                                      | One record per promise; merge the rules that serve it                                       |
| Rules about how agents or the team work ("only the author approves", "do not ask about X") | Leave them in the instruction files they came from                          |
| Reading other projects, or skills installed on the machine                 | Read this project's sources; another project only when this one points to it                |
| A removed feature hidden inside a roadmap or another record                | Its own `deprecated` record                                                                 |
| Inventing a decision to fill a section                                     | Leave the section out and list the gap in the report                                        |
| Reading only the repository                                                | Agent memory and instruction files usually hold the clearest product decisions             |
| Editing or deleting an old record on refresh                               | Supersede or deprecate it                                                                   |
| Copying an existing decision log                                           | Link it                                                                                     |
| Writing the README as prose                                                | The fixed sections of formats.md, short lines, each rule linking its record                 |
