# Day 1: HTML Tag + Page Skeleton (Tamil notes)

Date: 2026-10-09

## 1. HTML na enna? Edhukku venum?

Browser-ku nammala maadhiri kannu kidaiyaadhu. Plain text kudutha, edhu heading, edhu paragraph nu adhuku theriyaadhu.

> **HTML = content-ku kinnam (tag) pottu, adhu enna nu browser-kitta solradhu.**

| Hotel | Web |
|---|---|
| Plate | Browser (Chrome) |
| Saapadu items | Content (text, image, button) |
| Kinnam (bowl) | HTML tag |

## 2. Tag eppadi irukkum?

```html
<h1>Vanakkam</h1>
```

| Part | Artham |
|---|---|
| `<h1>` | Opening tag (kinnam open) |
| `Vanakkam` | Content (ulla irukka saapadu) |
| `</h1>` | Closing tag (kinnam close), **`/` mukkiyam!** |

- `h1` = perusa (heading), `p` = normal size (paragraph)
- **Tags screen-la theriyaadhu.** Customer saapadu-a dhaan paappaanga, kinnam-a illa.

## 3. Page skeleton

```html
<!DOCTYPE html>
<html>
    <head>
        <title> Prem's First Page </title>
    </head>
    <body>
        <h1> Vanakkam </h1>
        <p> This is Prem </p>
    </body>
</html>
```

| Tag | Hotel-la | Velai (why) |
|---|---|---|
| `<!DOCTYPE html>` | "Idhu hotel" board | Indha document HTML5 rules-a follow pannudhu nu browser-kitta solradhu |
| `<html>` | Full hotel building | Ella code-um idhukkulla |
| `<head>` | Kitchen / office | Background info, screen-la theriyaadhu |
| `<body>` | Dining hall | Screen-la theriyura content |
| `<title>` | Hotel peru board | Browser **tab**-la theriyum |

## 4. Naan kandupidichadhu 👀

- `<title>` illana → tab-la **file address** theriyum
- `<title>` pottaa → tab-la **Prem's First Page** theriyum
- `<title>` head-kulla irukku → page-la theriyaadhu, tab-la mattum

## 5. Indha naal thappu (errors) ❌ → ✅

| Try | Naan ezhudhinadhu | Thappu |
|---|---|---|
| 1 | `<DOUCTYPE html>` | `!` missing + extra `U` |
| 2 | `<!DOCUTYPE html>` | `!` fixed, aana `U` innum irukku |
| 3 | `<!DOCTYPE html>` | ✅ Correct |

💡 **Memory trick:** **DOC** (document) + **TYPE** (vagai) = DOCTYPE

## 6. Small things

- Extra space (`<h1> Vanakkam </h1>`) browser ignore pannidum
- Indent (ulla space) potta code padikka easy
