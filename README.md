# Golfsies website

Landing page for **Golfsies®**, a 6-hole social golf league on the Gold Coast.
The site is one static file (`index.html`) and needs no build step.

## Before going live

1. **Connect the form.** Create a free form at [formspree.io](https://formspree.io), then in `index.html` set
   `const FORM_ENDPOINT = "https://formspree.io/f/your-id";`
   Until this is set, submitting opens the visitor's email app addressed to `rohan@golfsies.com.au`.
2. **Add the real logo.** Put the logo file in this folder (e.g. `logo.png`) and swap the text wordmark in the header for
   `<img src="logo.png" alt="Golfsies">`. The comment above the header link marks the spot.
3. **Check the details.** Launch timing ("Summer 2026–27"), the 8-team cap and loan clubs are all stated on the page.

## Publish with GitHub Pages

1. In this repo go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
3. The site appears at `https://boatsy007.github.io/golfsies123/` within a minute or two.

### Use golfsies.com.au

1. In **Settings → Pages → Custom domain**, enter `golfsies.com.au` and save (this adds a `CNAME` file).
2. At your domain registrar, add DNS records:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` pointing to `boatsy007.github.io`
3. Once DNS has updated, tick **Enforce HTTPS**.

## Preview locally

Open `index.html` in a browser.
