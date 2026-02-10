export function parseRepoUrl(repoUrl) {
  try {
    const url = new URL(repoUrl);
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Invalid GitHub repository URL");
    }

    return {
      owner: parts[0],
      repo: parts[1]
    };
  } catch {
    throw new Error("Invalid GitHub repository URL");
  }
}

export async function fetchRepoData(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        "Accept": "application/vnd.github+json"
      }
    }
  );

  if (!response.ok) {
    throw new Error("Repository not found or GitHub API error");
  }

  return response.json();
}

export async function fetchRepoContents(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents`,
    {
      headers: {
        "Accept": "application/vnd.github+json"
      }
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch repository contents");
  }

  return response.json();
}

export function analyzeContents(contents) {
  const names = contents.map(item => item.name.toLowerCase());

  return {
    hasReadme: names.some(name => name.startsWith("readme")),
    hasLicense: names.includes("license"),
    hasGitignore: names.includes(".gitignore"),
    hasPackageJson: names.includes("package.json"),
    hasTests: names.includes("test") || names.includes("tests")
  };
}

