## Repo Quality Scanner

Analyze any GitHub repository and get an instant quality score (0–100).

This CLI tool helps developers, recruiters, and teams quickly answer one question:

> ***“Is this repository production-ready?”***

---

## Why This Exists

When you look at a GitHub repository, you usually ask:

- Is there a README?
- Is it licensed?
- Are there tests?
- Is it maintained properly?

But answering these questions manually takes time.

**Repo Quality Scanner** automates this process and gives you a **clear, opinionated score.**

---

## Features

- Analyze any public GitHub repository
- Quality score from **0 to 100**
- Production readiness label
- Detailed score breakdown
- Summary mode (one-line output)
- JSON output (CI / automation friendly)
- Zero external dependencies
- Uses only Node.js core + GitHub public API

---

## Installation

Clone the repository:

git clone https://github.com/yeet4devv/repo-quality-scanner.git
cd repo-quality-scanner

Install (no dependencies required):

npm install

---

## Usage

Analyze a repository:

npm run scan -- https://github.com/facebook/react

---

## Summary Mode

Perfect for quick checks and README demos:

npm run scan -- https://github.com/facebook/react --summary

Output example:

facebook/react → 95/100 (🟢 Production Ready)

---

## JSON Output

Useful for CI pipelines and scripts:

npm run scan -- https://github.com/facebook/react --json

Example output:

```
{
"repository": "facebook/react",
"score": 95,
"status": "🟢 Production Ready",
"stars": 200000,
"checks": {
"hasReadme": true,
"hasLicense": true,
"hasGitignore": true,
"hasPackageJson": true,
"hasTests": true
}
}
```

---

## Scoring Criteria

| Check                          | Points  |
| ------------------------------ | ------- |
| README present                 | 25      |
| LICENSE present                | 15      |
| package.json present           | 15      |
| Tests detected                 | 20      |
| .gitignore present             | 10      |
| Popular repository (≥50 stars) | 10      |
| **Total**                      | **100** |

---

## Status Labels

- 🟢 Production Ready (85–100)
- 🟡 Needs Improvement (60–84)
- 🔴 Not Ready (0–59)

---

## Who Is This For?

- Developers reviewing open-source projects
- Recruiters evaluating portfolios
- Teams enforcing repository standards
- CI pipelines and automation scripts
- Anyone who wants objective repo quality metrics

---

## Design Principles

- Opinionated, but transparent
- Simple rules over complex heuristics
- Zero dependency risk
- Easy to audit and extend
- CLI-first mindset

---

## Roadmap

- Markdown report output
- Configurable scoring rules
- GitHub Action integration
- Global CLI install
- Historical score tracking

---

## Contributing

Contributions are welcome.

If you have ideas for better scoring rules or new checks, feel free to open an issue or pull request.

---

## License

MIT License
