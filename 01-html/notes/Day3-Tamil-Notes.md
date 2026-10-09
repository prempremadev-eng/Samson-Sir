# Day 3: Links `<a>` (Tamil notes)

Date: 2026-10-09 · Practice files: `index.html`, `about.html`

## 1. Link edhukku venum?

Rendu page (room) irundhaalum, naduvula **kadhavu** 🚪 illana customer poga mudiyaadhu.

> **Link = rendu page-ku naduvula kadhavu.** Click pannaa adutha page-ku pogum.

## 2. Link eppadi irukkum?

```html
<a href="about.html">About Me</a>
```

| Part | Artham | Hotel |
|---|---|---|
| `<a>` | **a**nchor ⚓ | Kadhavu |
| `href="about.html"` | Enga pogum | Kadhavu-la ezhudhina room peru |
| `About Me` | Click panra text | Kadhavu board |

## 3. Attribute 🆕

- Tag-ku **extra information**
- **Opening tag-kulla** mattum
- Format: `name="value"` (`=` + quotes `" "`)
- 2 attributes → naduvula **space**

## 4. `href` dhaan link-a link aakkum 🔑

| Code | Screen-la |
|---|---|
| `<a href="about.html">About Me</a>` | Blue + underline, click panna pogum |
| `<a>About Me</a>` | Normal black text, engayum pogaadhu |

Oru thadavai pona link → **purple** 🟣

## 5. Relative vs Absolute

| Vagai | Example | Browser enga thedum | Hotel |
|---|---|---|---|
| Relative | `about.html` | Same folder (laptop) | Adutha room |
| Absolute | `https://www.google.com` | Internet | Vera ooru hotel 🚗 |

- `href="google.com"` ❌ → folder-la `google.com` file thedum → File not found
- `https://` = "idhu internet address" nu browser-kitta solradhu (`:` + **2 `/`**)

## 6. `target="_blank"`: pudhu tab

```html
<a href="https://www.google.com" target="_blank">Go Google</a>
```

| Link | `_blank` venuma? | Why |
|---|---|---|
| Same website (`about.html`) | ❌ | Home link vechu thirumba varalaam |
| Vera website (Google) | ✅ | Customer-a izhakka koodaadhu |

- Same tab-la Google pona → Google-la namma Home link **illa** → Back button ⬅️ mattum dhaan
- `_blank`-la underscore `_` mukkiyam

## 7. `<a>` = inline

Rendu link pakkathula pakkathula varum. Thani line-ku `<br>` venum.

## 8. Indha naal

| | |
|---|---|
| Typo | **Zero!** 🎉 |
| Quiz | 6 / 6 |
