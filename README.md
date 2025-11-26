# Neocodyr

A collaborative learning platform combining forum-based discussions with integrated code execution and testing capabilities.

## Overview

This application provides a unified environment for technical discussions and coding practice. Users can participate in forum discussions, write and execute code in multiple languages, create custom test cases, and collaborate on problem-solving.

## Features

### Forum Functionality
- Create and manage discussion threads
- Post questions and answers
- Upvote/downvote content
- Comment on posts
- Tag and categorize discussions
- Search and filter threads
- User reputation system

### Code Execution
- Multi-language support
- Real-time code editor with syntax highlighting
- Execute code against predefined test cases
- View execution results and console output
- Performance metrics (runtime, memory usage)

### Custom Test Cases
- Create custom input/output test cases
- Validate code against custom tests
- Share test cases with the community
- Batch test execution

## Contributing

### Commit Messages

Follow the Conventional Commits specification:

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config, build)

Examples:
```
feat: add thread upvoting functionality
fix: resolve syntax highlighting bug for Python
docs: update installation instructions
refactor: optimize database queries for forum posts
chore: update dependencies to latest versions
docs: add ERD for forum and user relationships
```

### Pull Requests

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/add-syntax-highlighting
   ```

2. Make your changes and commit following the commit message guidelines

3. Push your branch:
   ```bash
   git push origin feature/add-syntax-highlighting
   ```

4. Create a Pull Request with:
   - **Title**: Use the branch name with the first letter capitalised (e.g., `Feature/add-syntax-highlighting`)
   - **Description**: Write a clear description of what the PR does:
     ```
     This PR adds syntax highlighting support for the code editor.
     
     Changes:
     - Integrated Monaco Editor for better syntax support
     - Added language detection
     - Updated editor styling to match app theme
     - Added tests for new functionality
     
     Fixes #123
     ```

5. Wait for code review and address any feedback

6. Once approved, the PR will be merged into `main`