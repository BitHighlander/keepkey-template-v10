import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve paths
const templatesDir = path.resolve(__dirname, '../templates');

// Define available templates
const TEMPLATES = {
  basic: 'Basic template with essential features',
  full: 'Full-featured application template',
};

// Main function
export async function createApp() {
  console.log(`
${chalk.bold(chalk.blue('Create KeepKey App'))}
${chalk.gray('A CLI tool for creating KeepKey applications')}
  `);

  // Define CLI program
  const program = new Command()
    .name('create-keepkey-app')
    .description('Create a new KeepKey application with pre-configured templates')
    .version('0.1.0')
    .argument('[project-directory]', 'The directory to create the project in')
    .option('-t, --template <template>', 'Specify a template to use', 'basic')
    .option('--skip-install', 'Skip dependency installation', false)
    .option('--use-npm', 'Use npm as package manager')
    .option('--use-yarn', 'Use yarn as package manager')
    .option('--use-pnpm', 'Use pnpm as package manager')
    .option('--no-connection-indicator', 'Disable connection indicator')
    .parse(process.argv);

  const options = program.opts();
  let projectDir = program.args[0];

  // If no directory is provided, prompt for one
  if (!projectDir) {
    const res = await prompts({
      type: 'text',
      name: 'projectDir',
      message: 'What is your project named?',
      initial: 'my-keepkey-app',
      validate: (value) => {
        if (value.trim() === '') {
          return 'Project directory cannot be empty';
        }
        return true;
      },
    });

    if (!res.projectDir) {
      console.log(chalk.red('Project creation cancelled.'));
      return;
    }

    projectDir = res.projectDir;
  }

  // Resolve absolute path
  const resolvedProjectDir = path.resolve(process.cwd(), projectDir);

  // Check if directory already exists
  if (fs.existsSync(resolvedProjectDir)) {
    if (fs.readdirSync(resolvedProjectDir).length > 0) {
      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: `${chalk.yellow('Warning:')} The directory ${chalk.cyan(projectDir)} is not empty. Continue?`,
        initial: false,
      });

      if (!proceed) {
        console.log(chalk.red('Project creation cancelled.'));
        return;
      }
    }
  }

  // If no template was specified, prompt for one
  if (!options.template || !Object.keys(TEMPLATES).includes(options.template)) {
    const { template } = await prompts({
      type: 'select',
      name: 'template',
      message: 'Select a template',
      choices: Object.entries(TEMPLATES).map(([value, title]) => ({ title, value })),
      initial: 0,
    });

    if (!template) {
      console.log(chalk.red('Project creation cancelled.'));
      return;
    }

    options.template = template;
  }

  // Determine package manager
  let packageManager = 'npm';
  if (options.useYarn) packageManager = 'yarn';
  if (options.usePnpm) packageManager = 'pnpm';

  // Show configuration
  console.log(`
${chalk.bold('Configuration:')}
${chalk.gray('- Project directory:')} ${chalk.cyan(projectDir)}
${chalk.gray('- Template:')} ${chalk.cyan(options.template)}
${chalk.gray('- Package manager:')} ${chalk.cyan(packageManager)}
${chalk.gray('- Include connection indicator:')} ${chalk.cyan(options.connectionIndicator ? 'Yes' : 'No')}
  `);

  // Confirm configuration
  const { confirmConfig } = await prompts({
    type: 'confirm',
    name: 'confirmConfig',
    message: 'Is this correct?',
    initial: true,
  });

  if (!confirmConfig) {
    console.log(chalk.red('Project creation cancelled.'));
    return;
  }

  // Create project directory
  const spinner = ora('Creating project...').start();
  try {
    // Ensure the project directory exists
    fs.ensureDirSync(resolvedProjectDir);

    // Copy template files
    spinner.text = 'Copying template files...';
    
    // Note: In a real implementation, we would copy actual template files
    // For this example, we'll just create a simple structure
    
    // Create basic structure
    fs.ensureDirSync(path.join(resolvedProjectDir, 'src/app'));
    fs.ensureDirSync(path.join(resolvedProjectDir, 'src/components'));
    fs.ensureDirSync(path.join(resolvedProjectDir, 'public'));
    
    // Create package.json
    const packageJson = {
      name: path.basename(resolvedProjectDir),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        'next': '15.1.7',
        'react': '^19.0.0',
        'react-dom': '^19.0.0',
        '@chakra-ui/react': '^3.8.0',
      },
    };
    
    // Add connection indicator if enabled
    if (options.connectionIndicator) {
      packageJson.dependencies['@keepkey/connection-indicator'] = 'latest';
    }
    
    // Write package.json
    fs.writeFileSync(
      path.join(resolvedProjectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create README.md
    fs.writeFileSync(
      path.join(resolvedProjectDir, 'README.md'),
      `# ${path.basename(resolvedProjectDir)}\n\nA KeepKey application created with create-keepkey-app.\n`
    );

    // Skip dependency installation if requested
    if (!options.skipInstall) {
      spinner.text = `Installing dependencies with ${packageManager}...`;
      // In a real implementation, we would run actual commands
      // For this example, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    spinner.succeed('Project created successfully!');
    
    // Show next steps
    console.log(`
${chalk.bold('Next steps:')}
  ${chalk.cyan(`cd ${projectDir}`)}
  ${chalk.cyan(`${packageManager} ${options.skipInstall ? 'install' : 'dev'}`)}

${chalk.bold('Documentation:')}
  ${chalk.blue('https://docs.keepkey.com')}
    `);

  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red(error));
    process.exit(1);
  }
} 