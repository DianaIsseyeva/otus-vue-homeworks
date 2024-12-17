import { spawn } from 'child_process';

const globalSetup = async () => {
  global.__APP__ = spawn('npm', ['start'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  // Дождитесь запуска сервера
  await new Promise(resolve => setTimeout(resolve, 5000));
};

export default globalSetup;
