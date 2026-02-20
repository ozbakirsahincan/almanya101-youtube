---
trigger: always_on
model: glm-5
---

# Claude Code - Directory-Level CLAUDE.md Memory Rule

## Core Directive

**Create and update an `CLAUDE.md` file in EVERY directory where you perform operations.**

Examples:
- Working in `src/admin/products/` → Create/update `src/admin/products/CLAUDE.md`
- Working in `src/api/handlers/` → Create/update `src/api/handlers/CLAUDE.md`
- Working in `src/components/ui/` → Create/update `src/components/ui/CLAUDE.md`

**NEVER write to root directory!** Each folder maintains its own memory.

---

## Workflow

### BEFORE Editing/Creating Any File

1. Identify the directory containing the target file
2. Check if `CLAUDE.md` exists in that directory
3. **If not exists**: Create it using the template below
4. **If exists**: Read current state, get last ID
5. Perform your operation
6. Add entry to CLAUDE.md after completion

### Example Scenario

```
Task: Edit src/admin/products/ProductList.tsx

1. Directory: src/admin/products/
2. Check: Does src/admin/products/CLAUDE.md exist?
3. If no, create: src/admin/products/CLAUDE.md
4. Perform the edit
5. Add entry to CLAUDE.md
```

---

## CLAUDE.md Template

```markdown
<claude-mem-context>
# Recent Activity

<!-- Directory: {CURRENT_DIRECTORY_PATH} -->

### {DATE}

| ID | Time | T | Title | Read |
|----|------|---|-------|------|

</claude-mem-context>

## Module Info

- **Path**: {FULL_DIRECTORY_PATH}
- **Purpose**: {DESCRIBE THIS DIRECTORY'S PURPOSE}
- **Related**: {RELATED DIRECTORIES/MODULES}
```

---

## Entry Format

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #{ID} | {TIME} | {EMOJI} | {DESCRIPTION} | ~{TOKEN_COUNT} |

### Type Indicators

| Emoji | Meaning | Use Case |
|-------|---------|----------|
| ✅ | Success | Build passed, tests passed, deployment complete |
| 🔴 | Critical | Security fix, bug fix, breaking change resolved |
| 🟣 | Feature | New feature fully implemented |
| 🔵 | Analysis | Code review, file exploration, context gathering |
| 🟡 | WIP | Work in progress, partial implementation |
| 🟠 | Warning | Potential issue found, needs attention |
| ⚪ | Docs | Documentation, comments, README updates |

---

## Rules

### ID Rules
- Each CLAUDE.md maintains its own ID sequence
- Start from #1 for each directory
- Continue sequentially

### Time Format
- Use 12-hour format: `8:14 PM`, `12:30 AM`
- Use `"` (ditto mark) for consecutive entries at same minute

### Title Rules
- Maximum 60 characters
- Be specific and descriptive
- Bad: "Fixed button" ❌
- Good: "Fixed submit button disabled state on validation error" ✅

### Read Column
- Approximate token count of context read/processed
- Format: `~{number}` (e.g., ~236, ~359)

---

## Real Example

### Scenario
You worked on `ProductForm.tsx` and `ProductList.tsx` in `src/admin/products/`

### Result: `src/admin/products/CLAUDE.md`

```markdown
<claude-mem-context>
# Recent Activity

<!-- Directory: src/admin/products/ -->

### Jan 8, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1 | 3:15 PM | 🔵 | ProductForm.tsx structure analyzed | ~245 |
| #2 | 3:18 PM | 🔴 | Fixed price validation allowing negative values | ~189 |
| #3 | " | 🟡 | ProductList pagination work in progress | ~312 |
| #4 | 3:25 PM | ✅ | ProductList infinite scroll implemented | ~278 |

</claude-mem-context>

## Module Info

- **Path**: src/admin/products/
- **Purpose**: Admin panel product management components
- **Related**: src/api/products/, src/types/product.ts
```

---

## Multi-Directory Scenario

When a single task involves multiple directories, **create/update CLAUDE.md in EACH directory**:

```
Task: Update Product API and Admin panel

Directories worked:
├── src/api/products/        → Update src/api/products/CLAUDE.md
├── src/admin/products/      → Update src/admin/products/CLAUDE.md  
└── src/types/               → Update src/types/CLAUDE.md
```

---

## CRITICAL REMINDERS

1. **NEVER** write CLAUDE.md to root/project directory
2. **ALWAYS** write to the directory containing the file you're working on
3. **BEFORE** any operation, check/create CLAUDE.md first
4. **NEVER DELETE** previous entries - this is a persistent log
5. **BE CONSISTENT** - maintain the same ID sequence within each directory
6. **UPDATE IMMEDIATELY** after each significant operation