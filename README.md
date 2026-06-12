# Storied Homes Walking Tour — Sign-Up Form

Lead capture form → Follow Up Boss integration for Alex McKinlay Corey / Heaps Estrin.

---

## What this does

A standalone sign-up page that:
- Collects name, email, phone, and address
- Posts directly to the Follow Up Boss `/events` API
- Tags each submission: `Walking Tour`, `Newsletter`, `Storied Homes`
- Shows a confirmation screen on success
- Costs nothing to host (Netlify free tier)

---

## Deploy to Netlify (10 minutes, free)

### Step 1 — Create a GitHub repository

1. Go to github.com → New repository → name it `storied-homes-form`
2. Upload all files from this folder (drag-and-drop in the GitHub UI works)

### Step 2 — Deploy on Netlify

1. Go to netlify.com → sign up free (use your GitHub account)
2. Click **Add new site → Import an existing project → GitHub**
3. Select the `storied-homes-form` repository
4. Leave build settings as-is → click **Deploy site**
5. Netlify gives you a URL like `storied-homes-form.netlify.app`

### Step 3 — Add your API key as an environment variable

This keeps the key off the public-facing page.

1. In Netlify: **Site configuration → Environment variables → Add a variable**
2. Key: `FUB_API_KEY`
3. Value: `fka_0qePhuQ3g2gr74U3uCNtRYfyj38HWhuBEy`
4. Click **Save**
5. Go to **Deploys → Trigger deploy** to rebuild with the variable active

### Step 4 — Update index.html to use the serverless function

Once deployed with the function, swap the direct API call in `index.html`
to go through your Netlify function instead (keeps key server-side):

In `index.html`, find the `handleSubmit` function and replace the fetch call:

```javascript
// BEFORE (direct call, key visible in source):
const response = await fetch('https://api.followupboss.com/v1/events', {
  ...
});

// AFTER (routes through serverless function, key hidden):
const response = await fetch('/.netlify/functions/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName, lastName, email, phone, address })
});
```

### Step 5 — Custom domain (optional, free)

In Netlify: **Domain management → Add a domain**
You can use a subdomain like `tours.heapsestrin.com` if you have DNS access.

### Step 6 — Link from Instagram

1. Copy your Netlify URL (e.g. `https://storied-homes-form.netlify.app`)
2. In Instagram: **Edit profile → Website** → paste the URL
3. Or add it to your Linktree / link-in-bio tool alongside other links

---

## What appears in Follow Up Boss

Each submission creates a contact with:
- **Source:** Storied Homes Walking Tour Sign-Up
- **Tags:** Walking Tour · Newsletter · Storied Homes
- **Fields:** First name, last name, email, phone, home address

You can set up a Lead Flow rule in FUB (Admin → Lead Flow) to automatically
assign these contacts to an action plan or tag-based workflow.

---

## Files

```
index.html                  — The form page (deploy this)
netlify.toml                — Netlify config
netlify/functions/submit.js — Serverless API proxy (secure version)
README.md                   — This file
```
