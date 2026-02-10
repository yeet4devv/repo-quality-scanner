#!/usr/bin/env node

import {
  parseRepoUrl,
  fetchRepoData,
  fetchRepoContents,
  analyzeContents
} from "./scanner.js";

import { calculateScore } from "./scorer.js";

const args = process.argv.slice(2);
const repoUrl = args.find(arg => !arg.startsWith("--"));

const isSummary = args.includes("--summary");
const isJson = args.includes("--json");

if (!repoUrl) {
  console.error("❌ Please provide a GitHub repository URL");
  process.exit(1);
}

(async () => {
  try {
    const { owner, repo } = parseRepoUrl(repoUrl);

    const repoData = await fetchRepoData(owner, repo);
    const contents = await fetchRepoContents(owner, repo);
    const analysis = analyzeContents(contents);

    const result = calculateScore(repoData, analysis);

    if (isJson) {
      console.log(JSON.stringify({
        repository: repoData.full_name,
        score: result.score,
        status: result.label,
        stars: repoData.stargazers_count,
        checks: analysis,
        breakdown: result.details
      }, null, 2));
      return;
    }

    if (isSummary) {
      console.log(
        `${repoData.full_name} → ${result.score}/100 (${result.label})`
      );
      return;
    }

    console.log("🔍 Repository:", repoData.full_name);
    console.log("⭐ Stars:", repoData.stargazers_count);
    console.log("🍴 Forks:", repoData.forks_count);
    console.log("🐞 Open Issues:", repoData.open_issues_count);

    console.log("\n🧪 Quality Checks");
    console.log("README:", analysis.hasReadme ? "✅" : "❌");
    console.log("LICENSE:", analysis.hasLicense ? "✅" : "❌");
    console.log("package.json:", analysis.hasPackageJson ? "✅" : "❌");
    console.log("Tests:", analysis.hasTests ? "✅" : "❌");
    console.log(".gitignore:", analysis.hasGitignore ? "✅" : "❌");

    console.log("\n⭐ Quality Score");
    console.log(`Score: ${result.score}/100`);
    console.log(`Status: ${result.label}`);

    console.log("\n📋 Breakdown");
    result.details.forEach(line => console.log("-", line));

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();