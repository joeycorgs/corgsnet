# corgs.net — Maintenance Guide

## What it is

Joey's personal homepage at `corgs.net`. Static site hosted on GitHub Pages (repo: `joeycorgs/corgsnet`, branch: `main`). The CNAME file points the custom domain.

Green-on-black terminal aesthetic. Clicking the title reveals a tab menu. Tabs can show content panels inline or link out.

## File structure

```
corgsnet/
├── index.html      — markup: title, tabs, content panels
├── script.js       — all interactivity (tab nav, panel show/hide)
├── style.css       — all styling (terminal theme, tabs, panels)
├── favicon.png     — the corgi icon
├── CNAME           — "corgs.net" — GitHub Pages custom domain
└── docs/
    └── MAINTENANCE.md  — this file
```

## How tabs work

1. User clicks the title (or presses Enter) → tabs slide into view
2. Arrow up/down or mouseover highlights a tab
3. Enter or click on a highlighted tab → activates it
4. Activation calls `activateTab(index)` which hides all panels, then shows the panel whose `id` matches the tab's `data-panel` attribute
5. Escape or clicking the title again hides everything

If a tab has no `data-panel` attribute, selecting it does nothing (placeholder behavior).

## Adding a new tab

**Step 1 — Add the tab in index.html:**
```html
<div class="tab" data-panel="my-panel-id"> My Tab Name</div>
```
Note the leading space in the tab label — it's intentional padding before the `> ` caret.

**Step 2 — Add the panel in index.html:**
```html
<div class="panel hidden" id="my-panel-id">
    <div class="panel-item">
        <a href="https://example.com" target="_blank" rel="noopener">example.com</a>
        <span class="panel-comment">// short description</span>
    </div>
</div>
```

That's it. No JS changes needed — `activateTab()` finds the panel by `data-panel` id automatically.

## Adding a project to the Projects tab

Open `index.html`, find `id="projects-panel"`, add a new `panel-item` block:

```html
<div class="panel-item">
    <a href="https://yourproject.com" target="_blank" rel="noopener">yourproject.com</a>
    <span class="panel-comment">// one-line description</span>
</div>
```

## Current tabs

| Tab | data-panel | Status |
|-----|-----------|--------|
| Projects | `projects-panel` | Live — shows dopamineshop.co |
| Tab 2 | *(none)* | Placeholder |
| Tab 3 | *(none)* | Placeholder |

## Current projects

| Project | URL | Notes |
|---------|-----|-------|
| Dopamine Shop | https://dopamineshop.co | Viral fake checkout site |

## Deployment

Push to `main` → GitHub Pages auto-deploys. No build step — pure HTML/CSS/JS.

```bash
git add -A
git commit -m "your message"
git push origin main
```

Live at `https://corgs.net` within ~1 minute.

## Keyboard shortcuts (for reference)

| Key | Action |
|-----|--------|
| Enter (on title) | Toggle tabs |
| Arrow Up/Down | Navigate tabs |
| Enter (on tab) | Activate tab / open panel |
| Escape | Close tabs and panels |
