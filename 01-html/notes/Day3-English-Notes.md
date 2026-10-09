# Day 3: Links (English notes)

Date: 2026-10-09 · Practice files: `index.html`, `about.html`

## 1. Why do we need links?

A link connects two pages. When the user clicks it, the browser opens the other page.

```html
<a href="about.html">About Me</a>
```

- `<a>` is the anchor tag.
- `href` tells the browser where to go.
- The text between the tags is what the user clicks.

## 2. Attributes

An attribute gives extra information to a tag. It goes inside the opening tag and looks like `name="value"`. Two attributes are separated by a space.

## 3. Without `href`

`<a>About Me</a>` shows as plain black text and goes nowhere. The `href` makes it a real link.

## 4. Relative and absolute links

| Type | Example | Where the browser looks |
|---|---|---|
| Relative | `about.html` | In the same folder |
| Absolute | `https://www.google.com` | On the internet |

`href="google.com"` does not work, because the browser looks for a file called `google.com` in the folder.

## 5. `target="_blank"`

This opens the link in a new tab. Use it for links to other websites, so the user does not leave our page.

## 6. Vocabulary

| Word | Meaning |
|---|---|
| link | something you click to go to another page |
| anchor | the `<a>` tag |
| attribute | extra information inside a tag |
| relative path | a short address inside the same folder |
| absolute path | a full internet address |
| new tab | a new page window in the browser |

## 🗣️ Spoken English practice (read these aloud)

1. "A link connects one page to another page."
2. "The href attribute tells the browser where to go."
3. "Attributes always go inside the opening tag."
4. "Without href, the link is just plain text."
5. "A relative link points to a file in the same folder."
6. "An absolute link needs the full address with https."
7. "I use target blank so the other website opens in a new tab."
8. "Today I made zero typos!"

### Practice conversation

- **Q:** Why didn't `href="google.com"` work?
- **A:** Because the browser looked for a file called google.com in my folder. I need to add https in front.
- **Q:** When do you use target blank?
- **A:** When I link to another website, so the user doesn't leave my page.
