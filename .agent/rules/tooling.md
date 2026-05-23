---
trigger: always_on
---

# Tooling

* You are running in a PowerShell environment. Do NOT use Unix utilities like `sed`, `awk`, `xargs`, or `find`.
* You have access to ripgrep (`rg`), but not `grep`.
* When using PowerShell cmdlets like `Select-String`, remember to use explicit parameters and proper quoting for regex patterns (e.g., `Select-String -Pattern "regex" -Path file.txt`) to avoid positional argument errors.