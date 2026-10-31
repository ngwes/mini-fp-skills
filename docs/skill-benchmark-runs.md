# Skill Benchmark Runs

Evaluation log for `@ngwes/mini-fp` skills.

Run with:
```bash
node scripts/run-benchmark.mjs <skill> [--reps N] [--concurrency N] >> docs/skill-benchmark-runs-log.md
```

---

## Method

For each scenario in `evals/<skill>.json`, each model and each rep, the runner makes two generation calls: the scenario prompt alone (baseline), and the same prompt with `skills/<skill>/SKILL.md` injected as library docs (with skill).

- **Grading:** each output is graded in one Haiku call that answers every criterion of the scenario at once, as one `<number>: YES|NO` line per criterion. If the answer doesn't give exactly one verdict per criterion, the call is retried once. If the retry fails too, those criteria count as 0 and the report shows an `[ERROR]` note under the scenario's table and in the Release Gate.
- **Concurrency:** independent calls run in parallel, at most `--concurrency` at a time (default 4). The report is assembled after every call finishes, so it has the same order as a sequential run. Each call still has a 120 s timeout, and a failed call is reported as `[ERROR]` and counted as 0.
- **Isolated `claude -p`:** every call runs with `--setting-sources ''` (no user, project or local settings, so no plugins, hooks or effort overrides), `--strict-mcp-config` (no MCP servers), `--disable-slash-commands` (no skills or commands), `--tools ''` (no tools: the model writes code in its answer and can't touch files), an appended system prompt that says no tools are available, and `--no-session-persistence`. Authentication uses the normal `claude` login.

Runs before this method graded each criterion in its own call, ran calls one at a time and used the user's `claude` environment. Their report's `Method:` line has no `Grading:` part.

---

## Release Gate

A change is **not ready** if any of these are true:

- Any criterion is **0% on every model under test** (currently Sonnet only) with skill enabled.
- Any **critical scenario** has a negative delta with skill enabled on any model.
- Any model shows a **repeatable regression** that is unexplained.

A change is **ready** when:

- No universal 0% criteria remain, and
- No skill-enabled regressions remain in critical scenarios.

---

## Run Log Template

Copy and fill in manually for quick directional evals (non-automated runs):

```markdown
## YYYY-MM-DD — <skill> benchmark

Method: <automated via run-benchmark.mjs | quick directional eval via subagent>.
Models: claude-sonnet-5-5. Reps: 3.

### Scenario: <scenario-id> *(critical)*

*<scenario prompt>*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| <criterion> | 0% | 0% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `<scenario-id>` — criterion: *"<criterion>"*
- **BLOCKED** (regression): `<scenario-id>` / <model> — *"<criterion>"*: X% → Y% (-Zpp)

**NOT READY** | **READY** — No universal 0% criteria. No critical regressions.
```

---

<!-- Automated run output appended below this line -->
