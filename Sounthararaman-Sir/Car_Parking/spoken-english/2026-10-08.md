# 🗣️ Spoken English Practice – 2026-10-08

Topics: GitHub & secrets, `.env`, `fetch`, guards, CORS, debugging. **Phase 5 complete!**

How to practise: read each line **out loud 3 times**. Then cover it and say it from memory.

---

## 1. Talking about what I did today

> "Today I finished Phase 5 of my vehicle entry app.
> I connected my React form to my Catalyst function with `fetch`.
> I got a CORS error, and I fixed it by adding the right headers on the server.
> Now, when I submit the form, the vehicle entry is saved in the cloud table."

---

## 2. Git & secrets

- "Before pushing, I checked that no API keys were in the commit."
- "The function config files are in `.gitignore`, because they hold API keys."
- "I got the error 'src refspec main does not match any' because I hadn't committed yet."
- "The order is: add, commit, and then push."

---

## 3. `.env` and `fetch`

- "I keep the backend URL in a `.env` file, so I only change it in one place."
- "Vite only exposes variables that start with `VITE_`."
- "I must not put secrets in `.env`, because those values reach the browser."
- "`fetch` is like curl inside the browser."
- "I send the form data as JSON using `JSON.stringify`."
- "If the response is not OK, I show an error and stop."

---

## 4. CORS

- "My React app runs on port 5174, and my function runs on port 3000, so they are different origins."
- "The browser sends a preflight OPTIONS request before the POST."
- "The server must reply with the `Access-Control-Allow-Origin` header."
- "curl doesn't check CORS, because only browsers enforce it."
- "CORS is not a replacement for authentication."

---

## 5. Explaining my bugs

- "The request returned 200, but it went to the wrong URL, so nothing was saved."
- "I forgot `.env` in `import.meta.env`, so the URL was undefined."
- "Another project was already using port 3000, so my server started on 3001."
- "I found which process was using the port with `ss`."
- "The column names in `insertRow` must match the table exactly, including capital letters."
- "The `entryType` variable only exists in React, so in the function I read it from the request body."

---

## 6. Useful phrases

| Phrase | When to use it |
|---|---|
| "A 200 status doesn't always mean success." | When the request went to the wrong place |
| "Let me check the request URL." | Debugging network calls |
| "The port is already in use." | Server starts on a different port |
| "It's a typo — I missed one letter." | Explaining a small mistake |
| "I verified it in the console." | After checking the result |
| "We finished this phase." | Talking about a milestone |

---

## 💬 My learning rule (say it!)

> **"I don't need the output — I need to know *why* it is needed."**
