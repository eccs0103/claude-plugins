# Folder formats

```
docs/product/
  README.md              Product Vision Board + elevator statement
  decisions/
    README.md            index of every record
    0001-<slug>.md       MADR 4.0, one per decision
  ROADMAP.md             Now / Next / Later (only with content)
  GLOSSARY.md            product terms (only with content)
  CHANGELOG.md           Keep a Changelog 1.1.0
```

General rules:

- Dates are ISO 8601 (`YYYY-MM-DD`).
- Links are relative.
- Text is in the language of the project's README.
- A section with nothing true to say is left out, never filled.

## README.md

Shape: the Product Vision Board (vision, target group, needs, product, business goals), plus the elevator statement from Geoffrey Moore's *Crossing the Chasm*.

```markdown
# Product vision

> For <target users> who <need>, <product> is a <category> that <key benefit>. Unlike <alternative>, it <differentiator>.

Updated YYYY-MM-DD · [Decisions](decisions/README.md) · [Changelog](CHANGELOG.md)

## Target users

- <group>: <what they come for>

## Needs

- <problem the product solves, in user words>

## Product

- <what the product gives them, at the level a user describes it>

## Business goals

- <goal, constraint or budget the product lives within>

## Non-goals

- <what the product refuses to be> ([NNNN](decisions/NNNN-slug.md))

## Rules in force

1. <binding rule in user words> ([NNNN](decisions/NNNN-slug.md))
```

- Drop any clause of the elevator statement that no source supports; never invent the alternative.
- *Rules in force* lists every `accepted` record, one line each.
- Keep this file and `decisions/README.md` together under 8,000 characters. The hooks inject both.

## decisions/README.md

```markdown
# Decisions

One record per product decision, in the [MADR 4.0](https://adr.github.io/madr/) format, numbered in the order they were made. A record is never deleted or rewritten: when a decision changes, a new record supersedes it.

| Number                     | Date       | Decision            | Status                          | Decided by |
| -------------------------- | ---------- | ------------------- | ------------------------------- | ---------- |
| [0001](0001-slug.md)       | YYYY-MM-DD | <short title>       | accepted                        | <role>     |
| [0002](0002-slug.md)       | YYYY-MM-DD | <short title>       | superseded by [0005](0005-slug.md) | <role>  |
```

- Rows run in number order.
- Number in the order the decisions were made, with the oldest first.
- Pad the columns so every `|` lines up.
- A project that already keeps its own decision log gets one line above the table: `Earlier decisions: [<log name>](<relative path>)`.
- Records from that log are never duplicated here.

## decisions/NNNN-slug.md

The slug is the title in lowercase kebab-case.

```markdown
---
status: accepted
date: YYYY-MM-DD
decision-makers: <role, e.g. project author, product team; "unknown" when no source says>
---

# <The decision as one short sentence>

## Context and Problem Statement

<Why the question came up: one to three sentences.>

## Considered Options

1. <the chosen option>
2. <another option, when a source names one>

<When no source names an alternative, write: "Only this option is recorded.">

## Decision Outcome

Chosen option: "<option>", because <reason from the source>.

### Consequences

- Good, because <what users gain>.
- Bad, because <what users or the business give up>.

### Confirmation

<How anyone can check the product still keeps it, observable from the outside.>

## More Information

- Confidence: Stated | Inferred
- Evidence: <path:line, commit, changelog version, or "agent memory (local)">
```

The `status` field takes one of these values:

| `status`               | Meaning                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| `proposed`             | Open question, not decided yet.                                     |
| `accepted`             | In force.                                                           |
| `rejected`             | The idea was declined; never re-propose it unless the user raises it. |
| `deprecated`           | Was in force and ended, with no successor.                          |
| `superseded by NNNN`   | Replaced by the named record.                                       |

Date rules:

- Use the date of the earliest evidence.
- When only a version is known, take that version's changelog date and say so in *Evidence*.

## ROADMAP.md

Write it only when sources name future direction. If the project already has a root `ROADMAP.md`, link it from the README and do not create this file.

```markdown
# Roadmap

Updated YYYY-MM-DD

## Now

- <product item in user words> (<evidence>)

## Next

- ...

## Later

- ...
```

## GLOSSARY.md

Write it only when the product has its own terms that users see.

```markdown
# Glossary

| Term   | Meaning, in user words |
| ------ | ---------------------- |
| <term> | <meaning>              |
```

## CHANGELOG.md

Follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/), with the run date as the heading.

```markdown
# Changelog

All notable changes to this product vision are documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## YYYY-MM-DD

### Added

- [0001](decisions/0001-slug.md) <title>

### Changed

- [0005](decisions/0005-slug.md) supersedes [0002](decisions/0002-slug.md): <what changed>

### Deprecated

- [0003](decisions/0003-slug.md) <title>: <why it ended>
```

- The newest run goes on top.
- Use only the groups that have lines.

## AGENTS.md section (offered, never written without a yes)

```markdown
## Product decisions

Read `docs/product/README.md` before planning or changing anything. Its accepted decisions are binding: when a task conflicts with one, stop and ask the user.
```
