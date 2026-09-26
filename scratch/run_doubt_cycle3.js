const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const localOutputFile = path.resolve(repoDir, 'scratch', 'adversarial_report_cycle3.md');
const brainOutputFile = 'C:/Users/katze/.gemini/antigravity-ide/brain/04e08bb1-36e5-49b0-a589-61e6dd879039/scratch/adversarial_report_cycle3.md';

const args = [
  'run',
  '--pure',
  '--auto',
  '--title', 'doubt-adversarial-review-cycle3',
  '-m', 'opencode/muse-spark-1.3-contributor-free',
  '-f', 'scratch/doubt_cycle3_input.md',
  '--',
  'Realiza la evaluacion adversaria del Ciclo 3 segun el archivo adjunto y emite tu dictamen final.'
];

console.log('Iniciando opencode Ciclo 3 con timeout estricto de 180s...');
console.log('Directorio de trabajo:', repoDir);

const child = spawn('opencode.exe', args, {
  cwd: repoDir,
  shell: false,
  stdio: ['ignore', 'pipe', 'pipe']
});

let stdoutData = '';
let stderrData = '';

child.stdout.on('data', chunk => {
  stdoutData += chunk.toString();
  process.stdout.write(chunk);
});

child.stderr.on('data', chunk => {
  stderrData += chunk.toString();
  process.stderr.write(chunk);
});

const TIMEOUT_MS = 180000;
const timer = setTimeout(() => {
  console.error(`[TIMEOUT] Proceso excedio los ${TIMEOUT_MS / 1000}s. Terminando...`);
  child.kill('SIGTERM');
  setTimeout(() => {
    try { child.kill('SIGKILL'); } catch (e) {}
  }, 3000);
}, TIMEOUT_MS);

child.on('close', code => {
  clearTimeout(timer);
  console.log(`\nProceso terminado con codigo: ${code}`);
  if (stdoutData.trim()) {
    fs.writeFileSync(localOutputFile, stdoutData, 'utf8');
    try { fs.writeFileSync(brainOutputFile, stdoutData, 'utf8'); } catch(e) {}
    console.log(`Reporte guardado en: ${localOutputFile}`);
  }
  if (code !== 0 && !stdoutData.trim()) {
    console.error('Error de opencode:', stderrData);
    process.exit(code || 1);
  }
});
