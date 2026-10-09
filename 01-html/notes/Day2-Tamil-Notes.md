# Day 2: Headings, Paragraph, Text Tags (Tamil notes)

Date: 2026-10-09 · Practice file: `about.html`

## 0. Pudhu file edhukku?

Ovvoru page-kkum thani `.html` file. `index.html` = default home page (hotel vaasal 🚪). `about.html` = rendaavadhu page.

## 1. Headings `h1` – `h6`

**Why:** Mukkiyathuvam (importance) kaatta. Newspaper headline maadhiri.

| Tag | Size | Mukkiyam |
|---|---|---|
| `h1` | Romba perusu | Page main title, **oru thadavai** mattum |
| `h2`–`h5` | Konjam konjam kuraiyum | Sections, sub-titles |
| `h6` | Normal text-a vida **chinnadhu** | Konjam mukkiyam |

- `<h7>` **illa**. Pottaa error varaadhu, aana normal text-a (heading illama) theriyum.
- `h7` (normal size) `h6`-a vida perusa theriyum 😮

> **Paadam:** Browser error solla maattaanga. Naama dhaan kavanamaa irukkanum.

## 2. `<br>`: pudhu line

**Why:** Browser-ku Enter = oru space. So `<p>Dosa (enter) Idli</p>` → ore line.

```html
<p>Prem <br> Kumbakonam <br> beef</p>
```

- 3 lines-ku **2** `<br>` (naduvula cut ✂️✂️)
- **Closing tag illa**: ulla content illa (empty tag)

## 3. `<hr>`: section-ku naduvula kodu

**Why:** Menu card-la Tiffin / Meals pirikka podra kodu maadhiri.

- Default-a **full width**
- **Closing tag illa** (empty tag)

## 4. `<strong>` and `<em>`

| Tag | Theriyum | Why |
|---|---|---|
| `<strong>` | **Bold** | Idhu **mukkiyam** (Today special!) |
| `<em>` | *Saivu* | Idhu **azhuthi** sollanum |

- Content irukku → **closing tag venum**
- Ellaathayum bold pannaadheenga. Ellaam mukkiyam = edhuvum mukkiyam illa

## 5. Nesting: kinnam-kulla kinnam 🥣🥣

```html
<strong><em>very tasty</em></strong>
```

Ulla open pannadhu **mudhalla** close aaganum.

## 6. Block vs Inline

| Vagai | Behaviour | Examples | Hotel |
|---|---|---|---|
| Block | Full width, pudhu line-la start | `h1`–`h6`, `p`, `hr` | Thani plate 🍽️ |
| Inline | Line-kulla, adhoda size mattum | `strong`, `em` | Plate-kulla oru item 🥄 |

`br` = block illa, line-kulla oru "next line" signal.

## 7. Golden rule ⭐

> **Opening tag-um closing tag-um same peru.** `<h3>` → `</h3>`
> Tip: `<h3></h3>` rendu-um mudhalla type pannu, appuram naduvula content.

## 8. Indha naal thappu ❌ → ✅

| Thappu | Fix |
|---|---|
| `<DOCTYPE html>` (`!` missing, again!) | `<!DOCTYPE html>` |
| `<h1> Prem>` (closing tag illa) | `<h1> Prem </h1>` |
| `Prem> </h1>` → screen-la `Prem>` | Extra `>` remove |
| `<h3> Prem </p>` | `</h3>` (same peru) |
| `<h5> prem </h6>` | `<h6> ... </h6>` |
| `coffie`, `kumbakonam`, `busstand` | `coffee`, `Kumbakonam`, `bus stand` |
| Edit pannumbodhu `strong`/`em` poyiduchu | Thirumba pottaachu |
