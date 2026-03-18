import fs from 'fs/promises';
import path from 'path';

const args = new Map();
for (const arg of process.argv.slice(2)) {
  const [key, value = ''] = arg.split('=');
  if (key.startsWith('--')) args.set(key.slice(2), value);
}

const reportsDir = args.get('reportsDir') || 'reports';
const url = args.get('url') || 'https://joshbarteaux.com/';
const device = args.get('device') || 'Mobile (Lighthouse default throttling)';
const runs = Number(args.get('runs') || '1');
const notes = args.get('notes') || 'Run in CI. Update values after each baseline capture.';

const dashboardPath = path.resolve('public/QuarterMaster-PerformanceDashboard.html');

const files = (await fs.readdir(reportsDir))
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.join(reportsDir, file));

if (!files.length) {
  throw new Error(`No Lighthouse JSON reports found in ${reportsDir}`);
}

const metrics = files.map(async (file) => {
  const raw = await fs.readFile(file, 'utf8');
  const report = JSON.parse(raw);
  const lhr = report.lhr || report;

  const perfScore = Math.round((lhr.categories?.performance?.score || 0) * 100);
  const audits = lhr.audits || {};

  return {
    performance: perfScore,
    lcp: audits['largest-contentful-paint']?.numericValue ?? 0,
    fcp: audits['first-contentful-paint']?.numericValue ?? 0,
    tbt: audits['total-blocking-time']?.numericValue ?? 0,
    cls: audits['cumulative-layout-shift']?.numericValue ?? 0,
    si: audits['speed-index']?.numericValue ?? 0,
  };
});

const results = await Promise.all(metrics);

const avg = (key) => results.reduce((sum, item) => sum + item[key], 0) / results.length;

const summary = {
  performance: Math.round(avg('performance')),
  lcp: Number((avg('lcp') / 1000).toFixed(1)),
  fcp: Number((avg('fcp') / 1000).toFixed(1)),
  tbt: Math.round(avg('tbt')),
  cls: Number(avg('cls').toFixed(2)),
  si: Number((avg('si') / 1000).toFixed(1)),
};

const capturedAt = new Date().toISOString();

const baseline = `const baseline = {
        capturedAt: "${capturedAt}",
        url: "${url}",
        device: "${device}",
        runs: ${runs},
        notes: "${notes}",
        metrics: {
          performance: {
            label: "Performance",
            value: ${summary.performance},
            unit: "score",
            target: ">= 90",
            range: 100,
          },
          lcp: {
            label: "LCP",
            value: ${summary.lcp},
            unit: "s",
            target: "<= 2.5",
            range: 4,
          },
          fcp: {
            label: "FCP",
            value: ${summary.fcp},
            unit: "s",
            target: "<= 1.8",
            range: 3,
          },
          tbt: {
            label: "TBT",
            value: ${summary.tbt},
            unit: "ms",
            target: "<= 200",
            range: 400,
          },
          cls: {
            label: "CLS",
            value: ${summary.cls},
            unit: "",
            target: "<= 0.10",
            range: 0.25,
          },
          si: {
            label: "Speed Index",
            value: ${summary.si},
            unit: "s",
            target: "<= 3.4",
            range: 6,
          },
        },
      };`;

const html = await fs.readFile(dashboardPath, 'utf8');
const updated = html.replace(/const baseline = \{[\s\S]*?\};/, baseline);

if (html === updated) {
  throw new Error('Baseline block not updated. Expected pattern not found.');
}

await fs.writeFile(dashboardPath, updated, 'utf8');
console.log('QuarterMaster dashboard updated:', dashboardPath);
