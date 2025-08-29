# Migrating from npm to pnpm

This guide will help you migrate your development environment from npm to pnpm.

## 🚀 Quick Migration

### 1. Install pnpm

```bash
# Using npm (temporary)
npm install -g pnpm

# Or using Corepack (recommended for Node.js 16.17+)
corepack enable
corepack prepare pnpm@latest --activate
```

### 2. Remove existing node_modules and lock files

```bash
# Clean up npm artifacts
rm -rf node_modules
rm package-lock.json
```

### 3. Install dependencies with pnpm

```bash
# Install all dependencies
pnpm install

# This will create pnpm-lock.yaml
```

### 4. Update your scripts

Most npm scripts work the same way with pnpm:

```bash
# These commands work identically
pnpm start      # same as npm start
pnpm test       # same as npm test
pnpm run build  # same as npm run build
```

### 5. Update global packages

```bash
# Instead of npm install -g
pnpm add -g <package-name>

# Examples
pnpm add -g @expo/cli
pnpm add -g @expo/eas-cli
pnpm add -g standard-version
pnpm add -g commitizen
```

## 🔄 Command Equivalents

| npm | pnpm | Notes |
|-----|------|-------|
| `npm install` | `pnpm install` | Install all dependencies |
| `npm install <pkg>` | `pnpm add <pkg>` | Install package |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` | Install dev dependency |
| `npm install -g <pkg>` | `pnpm add -g <pkg>` | Install globally |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` | Remove package |
| `npm run <script>` | `pnpm run <script>` | Run script |
| `npm test` | `pnpm test` | Run tests |
| `npm start` | `pnpm start` | Start development server |

## 📁 Project Structure Differences

### pnpm's node_modules structure

pnpm uses a different `node_modules` structure that creates hard links to a global store:

```
node_modules/
├── .pnpm/           # pnpm's internal structure
├── package-name/    # Hard link to global store
└── .modules.yaml    # pnpm's module information
```

This structure:
- **Saves disk space** by sharing dependencies across projects
- **Prevents dependency hoisting issues**
- **Is more secure** as packages can't access unintended dependencies

### Lock file

pnpm uses `pnpm-lock.yaml` instead of `package-lock.json`:

```yaml
lockfileVersion: 5.4
importers:
  .:
    dependencies:
      react:
        specifier: ^18.0.0
        version: 18.0.0
```

## 🛠️ Development Workflow

### Adding dependencies

```bash
# Add runtime dependency
pnpm add react-native-vector-icons

# Add development dependency
pnpm add -D @types/react

# Add to specific workspace (if using monorepo)
pnpm add react-native-vector-icons --filter mobile-app
```

### Updating dependencies

```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update react-native

# Interactive update
pnpm update --interactive
```

### Checking for outdated packages

```bash
# Check for outdated packages
pnpm outdated

# Update to latest versions
pnpm update --latest
```

## 🔧 Common Issues & Solutions

### 1. "Cannot find module" errors

**Problem**: Some tools expect npm's flat node_modules structure

**Solution**: Use `shamefully-hoist` flag in `.npmrc`:

```bash
# Create .npmrc in project root
echo "shamefully-hoist=true" >> .npmrc

# Reinstall dependencies
pnpm install
```

### 2. Global packages not found

**Problem**: pnpm installs global packages differently

**Solution**: Check where pnpm installs globals:

```bash
# Find global installation directory
pnpm config get global-dir

# Or use full path
pnpm exec <command>
```

### 3. CI/CD pipeline updates

Update your CI/CD configuration:

```yaml
# GitHub Actions
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: latest

- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18'
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

## 📊 Performance Benefits

### Installation Speed
- **Up to 2x faster** cold installs
- **Up to 5x faster** for cached dependencies
- **Parallel downloads** for better network utilization

### Disk Usage
- **Reduces disk usage** by up to 70% through hard linking
- **Shared global store** prevents duplicate installations
- **Automatic cleanup** of unused packages

### Development Experience
- **Faster scripts execution**
- **Better caching** for repeated operations
- **Stricter dependency resolution**

## 🔗 Useful Resources

- [pnpm Documentation](https://pnpm.io/)
- [Migration Guide](https://pnpm.io/migration-guide)
- [pnpm vs npm](https://pnpm.io/pnpm-vs-npm)
- [GitHub Actions Setup](https://pnpm.io/continuous-integration#github-actions)

## ❓ Need Help?

If you encounter issues during migration:

1. Check the [pnpm documentation](https://pnpm.io/)
2. Search existing [GitHub issues](https://github.com/pnpm/pnpm/issues)
3. Ask in the [pnpm Discord](https://discord.gg/pnpm)

Happy coding with pnpm! 🚀
