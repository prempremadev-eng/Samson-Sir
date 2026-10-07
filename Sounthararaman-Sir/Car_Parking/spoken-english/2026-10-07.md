# 🗣️ Spoken English Practice – 2026-10-07

Topics: Revision (catalyst init + serve), Part 3 (GET – read the table), Part 4 (POST – save a row), debugging.

How to practise: read each line **out loud 3 times**. Then cover it and say it from memory.

---

## 1. Talking about what I did today

> "Today I revised how `catalyst init` and `catalyst serve` work, using my hotel story.
> Then I connected my function to the Data Store and read the `ParkingEntries` table.
> After that, I added a POST handler that saves a new vehicle entry.
> Finally, I saved my first vehicle, `TN09AB1234`, and I saw it in the Catalyst Console."

---

## 2. catalyst init & serve (revision)

- "I run `catalyst init` inside the project folder, not in my home folder."
- "It creates `.catalystrc`, `catalyst.json`, and a `functions` folder."
- "`.catalystrc` links my folder to the cloud project."
- "`catalyst.json` lists the functions in the project."
- "When I run `catalyst serve`, it starts a local server on port 3000."
- "The SDK is stored in the `node_modules` folder inside the function."
- "Ctrl + C stops the server, but Ctrl + Z only pauses it."

---

## 3. Reading the table (GET)

- "`module.exports` makes my function available to `catalyst serve`."
- "`catalyst serve` gives my function two objects: `req` and `res`."
- "`req` is the request, and `res` is the response I send back."
- "I initialise the SDK with admin scope so I can access the Data Store."
- "I use `await` because reading from the cloud takes some time."
- "If I use `await`, the function must be marked `async`."
- "`res.writeHead` sets the status code and the headers."
- "`res.end` sends the body and finishes the response."

---

## 4. Saving a row (POST)

- "If the request method is POST, I read the body with `getBody`."
- "Then I map the body fields to the table columns and call `insertRow`."
- "I return status 201, which means a new record was created."
- "I use `return` so the GET code does not run after the POST code."
- "A browser address bar can only send GET requests, so I use `curl` to test POST."

---

## 5. Explaining errors (debugging)

- "I got a `TypeError` because I misspelled `getPagedRows`. The catch block caught it."
- "The response worked, but the `Content-Type` header was wrong, so the browser treated it as plain text."
- "I got a `SyntaxError` because I forgot a comma between two arguments."
- "I got a 500 error that said 'Empty row cannot be updated'."
- "The real cause was invalid JSON in my curl command — one key had no quotes."
- "So `JSON.parse` failed, `getBody` returned an empty object, and the row was empty."
- "When I see an error, I first read the message, then check the last log line, then look at the next line of code."
- "After fixing a bug, I always check the result again."

---

## 6. Useful phrases

| Phrase | When to use it |
|---|---|
| "Let me check the logs." | Before guessing what went wrong |
| "The request returned a 500 error." | Describing a server error |
| "It works, but the header is wrong." | Something works but is not fully correct |
| "I found the root cause." | You found the real reason, not just the symptom |
| "I fixed it and verified it." | After fixing and checking again |
| "Could you explain why this is needed?" | Asking for the reason, not just the code |

---

## 💬 My learning rule (say it!)

> **"I don't need the output — I need to know *why* it is needed."**
