# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/youtube-comments/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error codes (if applicable)
   - Your environment details (OS, Node version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript ES Modules** (type: "module")
- **ESLint** for code quality

Before submitting:
```bash
# Install dependencies
npm install

# Test the application
npm start

# Create a backup (optional)
npm run backup
```

### Coding Standards

1. **Use ES6+ features**: Arrow functions, async/await, destructuring
2. **Error handling**: All errors must include unique error codes (1000001-1000099)
3. **Clear naming**: Use descriptive names for variables and functions
4. **Modular design**: Keep services, utilities, and logic separated
5. **Settings-based configuration**: Use the settings.js file for all configurable values
6. **External secrets**: Never hardcode API keys - use external JSON files

### Adding New Features

When adding new features:
1. Add service logic in `src/services/files/`
2. Update utilities in `src/utils/files/` if needed
3. Add models in `src/core/models/files/`
4. Update enums in `src/core/enums/files/`
5. Add error codes with unique numbers
6. Test thoroughly with different YouTube videos

### Error Code Management

When adding new errors:
1. Use the next available error code (1000XXX format)
2. Format: `Error message (1000XXX)` at the end of the error message
3. Keep error messages descriptive and actionable

### API Usage Guidelines

When modifying YouTube API calls:
1. Respect rate limits (200,000 read operations per day)
2. Implement proper pagination using nextPageToken
3. Validate all API response fields before accessing
4. Handle edge cases (videos with no comments, disabled comments, etc.)

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
