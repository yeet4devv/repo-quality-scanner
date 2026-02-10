export function calculateScore(repoData, analysis) {
  let score = 0;
  const details = [];

  if (analysis.hasReadme) {
    score += 25;
    details.push("README present (+25)");
  } else {
    details.push("Missing README (0)");
  }

  if (analysis.hasLicense) {
    score += 15;
    details.push("LICENSE present (+15)");
  } else {
    details.push("Missing LICENSE (0)");
  }

  if (analysis.hasPackageJson) {
    score += 15;
    details.push("package.json present (+15)");
  } else {
    details.push("Missing package.json (0)");
  }

  if (analysis.hasTests) {
    score += 20;
    details.push("Tests detected (+20)");
  } else {
    details.push("No tests found (0)");
  }

  if (analysis.hasGitignore) {
    score += 10;
    details.push(".gitignore present (+10)");
  } else {
    details.push("Missing .gitignore (0)");
  }

  if (repoData.stargazers_count >= 50) {
    score += 10;
    details.push("Popular repository (+10)");
  } else {
    details.push("Low popularity (0)");
  }

  return {
    score,
    details,
    label: getLabel(score)
  };
}

function getLabel(score) {
  if (score >= 85) return "🟢 Production Ready";
  if (score >= 60) return "🟡 Needs Improvement";
  return "🔴 Not Ready";
}