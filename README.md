SecureLink — repository notes

How to publish the 400MB installer so users can download it

1) Manual (recommended): create a GitHub Release and attach the installer.

If you have the GitHub CLI installed, run:

```powershell
gh release create v1.0.0 downloads/SecureLink_Setup.exe --title "v1.0.0" --notes "SecureLink Windows installer"
```

2) Automated: push a tag (for example `v1.0.0`) and the included GitHub Actions workflow will create a Release and upload the `downloads/SecureLink_Setup.exe` asset. The workflow checks out with LFS enabled so the real binary is available to the runner.

After a release is published, the site download buttons point to the release asset URL if you update the `meta` tag in `index.html`:

```html
<meta name="github-release-download" content="https://github.com/OWNER/REPO/releases/latest/download/SecureLink_Setup.exe">
```

Replace `OWNER/REPO` with your GitHub organization or username and repository name.

Notes:
- GitHub repository file links will show LFS pointer files (small text). Use Releases or `git lfs pull` for the real file.
- GitHub Actions must have permission to create releases in this repo (default on most repos). If your repository is private or actions are restricted, enable Actions or run the `gh` command locally.

