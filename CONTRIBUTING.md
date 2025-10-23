# Contributing to InfraFund Landing Pro

Thank you for your interest in contributing! Please follow these guidelines to ensure a smooth review and merge process.

## Definition of Done: A Quality Gate for Every Task

To ensure we maintain the highest standards of security and code quality, every technical task must pass this formal Definition of Done (DoD) before it can be considered complete.

The responsibility for quality begins with the author of the code. A task is only considered ready for a Code Owner's final review after it has successfully passed the developer-led checks outlined below.

### Part 1: The Developer's Pre-Review Checklist

Before requesting any reviews, the developer responsible for the task must ensure the following are complete.

**Clear Context:** The Pull Request (PR) has been opened using the official PR template, with a clear title and a detailed description explaining what the code does, why it's necessary, and how a reviewer can test it.

**Clean Build:** All automated CI/CD checks (linters, builds, dependency checks) are passing. A PR with failing checks will not be reviewed.

**Comprehensive Testing:**
- The author has written new unit and/or integration tests that cover the new logic and functionality.
- All existing and new tests are passing.
- Overall test coverage has not decreased.

**Automated Security Scan:**
- (For Smart Contracts): The code has passed a run of our automated security analyzer (e.g., Slither) with no new high or medium-severity issues introduced.
- (For Backend/Frontend): The code has passed a run of our static analysis security testing (SAST) tools.

**Self-Review & AI Polish:** The author has performed a thorough self-review of their own code and has used AI Council (GitHub Copilot > CodeRabbit > GPT-5) to address any initial suggestions regarding style, clarity, or minor bugs.

### Part 2: The Formal Review & Merge Process

Once the developer has completed the pre-review checklist, the formal review process begins.

**Peer Review:** The author requests a review from at least one other developer on the team (a "peer"). This is to catch logic errors and ensure the code is understandable to other team members. All feedback from the peer review must be addressed.

**Final Code Owner Review (Tech Lead):** Once the peer review is complete and all feedback is resolved, the author requests a final review from the designated Code Owner, who is the Tech Lead (Homayoun). The Tech Lead's review is focused on high-level concerns:
- **Architectural Alignment:** Does this change fit with our long-term technical vision?
- **Security & Risk:** Does this introduce any new attack vectors or vulnerabilities?
- **Business Logic:** Does the code correctly and efficiently implement the business requirements of the task?

**Approval & Merge:** Once the Tech Lead approves the PR and all checks are green, the PR is ready to be merged into the main branch by the Tech Lead. Sven will be automatically notified of all merges and can choose to review any PR post-merge, with the ability to recommend a revert if necessary.

---

For questions, please contact the code owners or maintainers.
