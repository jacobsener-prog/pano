# Takım Panosu

Jungle Eva team board. One static HTML file, hosted free on GitHub Pages,
reading and writing a Supabase database.

**Live:** https://jacobsener-prog.github.io/pano/

## How it works

Two pieces, nothing else.

1. **This repo** — `index.html` is the whole app: markup, styles and script in
   one file. GitHub Pages serves it. Push a change to `main` and the live site
   updates within about a minute.
2. **Supabase** — project `vmkhwvaeslrckmlijmna`, region eu-central-1. Holds
   the four tables the board reads: `items`, `periodic`, `periodic_log`,
   `config_lists`, plus a `photos` storage bucket for attachments.

The page stores nothing itself. Every time it opens it asks Supabase for the
current data, and it re-asks every 20 seconds while the tab is in front, plus
whenever you switch back to it.

## No login

The first time someone opens the page they tap their name. That choice is
remembered in the browser and used to pre-fill "sorumlu". There is no email,
no password and no magic link — the previous version used Supabase magic-link
email and it kept failing on the 2-emails-per-hour cap.

The trade-off is that anyone who has the URL can read and edit the board. The
publishable Supabase key is in the page source, as it has to be for a static
site, and the row-level-security policies allow the anonymous role full access
to the four tables. Treat the URL as the password.

## Files

| File | What it is |
|---|---|
| `index.html` | The entire application |
| `manifest.json` | Lets the page install to a phone home screen |
| `icon-192.png`, `icon-512.png` | Home-screen icons |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Editing

Edit `index.html` and push. There is no build step, no npm, no dependencies.
