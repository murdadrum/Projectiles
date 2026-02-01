import fs from 'fs/promises';
import path from 'path';
import { parseStringPromise } from 'xml2js';

const reportsDir = 'reports';
const dashboardPath = path.resolve('public/Test-Run-Dashboard.html');

const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));
const readXml = async (file) => parseStringPromise(await fs.readFile(file, 'utf8'));

const safeNum = (value) => (Number.isFinite(value) ? value : 0);

const summarizePlaywright = async () => {
  const file = path.join(reportsDir, 'playwright.json');
  try {
    const report = await readJson(file);
    const stats = report.stats || {};
    const total = safeNum(stats.expected) + safeNum(stats.unexpected) + safeNum(stats.skipped) + safeNum(stats.flaky);
    const passed = safeNum(stats.expected);
    const failed = safeNum(stats.unexpected);
    const skipped = safeNum(stats.skipped);

    const failures = [];
    const walkSuites = (suites, parentTitle = '') => {
      for (const suite of suites || []) {
        const suiteTitle = [parentTitle, suite.title].filter(Boolean).join(' > ');
        for (const test of suite.tests || []) {
          const titlePath = [suiteTitle, test.title].filter(Boolean).join(' > ');
          const failedResult = (test.results || []).find((result) => result.status === 'failed');
          if (failedResult) {
            const error = (failedResult.errors && failedResult.errors[0] && failedResult.errors[0].message) || 'Failed';
            failures.push({
              suite: 'Playwright E2E',
              spec: titlePath || test.title,
              failure: error.split('\n')[0].slice(0, 120),
              status: 'Investigate',
            });
          }
        }
        walkSuites(suite.suites, suiteTitle);
      }
    };

    walkSuites(report.suites || []);

    return { total, passed, failed, skipped, failures };
  } catch {
    return { total: 0, passed: 0, failed: 0, skipped: 0, failures: [] };
  }
};

const summarizePytest = async () => {
  const file = path.join(reportsDir, 'pytest.xml');
  try {
    const report = await readXml(file);
    const suite = report.testsuites?.testsuite?.[0] || {};
    const total = Number(suite.$?.tests || 0);
    const failed = Number(suite.$?.failures || 0) + Number(suite.$?.errors || 0);
    const skipped = Number(suite.$?.skipped || 0);
    const passed = total - failed - skipped;

    const failures = [];
    const cases = suite.testcase || [];
    for (const testCase of cases) {
      if (testCase.failure || testCase.error) {
        const failure = (testCase.failure?.[0]?._ || testCase.error?.[0]?._ || 'Failed')
          .split('\n')[0]
          .slice(0, 120);
        failures.push({
          suite: 'Pytest Contracts',
          spec: testCase.$?.name || 'pytest',
          failure,
          status: 'Investigate',
        });
      }
    }

    return { total, passed, failed, skipped, failures };
  } catch {
    return { total: 0, passed: 0, failed: 0, skipped: 0, failures: [] };
  }
};

const main = async () => {
  const playwright = await summarizePlaywright();
  const pytest = await summarizePytest();

  const summary = {
    total: playwright.total + pytest.total,
    passed: playwright.passed + pytest.passed,
    failed: playwright.failed + pytest.failed,
    skipped: playwright.skipped + pytest.skipped,
  };

  const suites = [
    {
      name: 'Playwright E2E',
      total: playwright.total,
      passed: playwright.passed,
      failed: playwright.failed,
      duration: 'N/A',
    },
    {
      name: 'Pytest Contracts',
      total: pytest.total,
      passed: pytest.passed,
      failed: pytest.failed,
      duration: 'N/A',
    },
  ];

  const failures = [...playwright.failures, ...pytest.failures].slice(0, 6);

  const latest = `const latest = {
        capturedAt: "${new Date().toISOString()}",
        branch: "main",
        commit: "${process.env.GITHUB_SHA?.slice(0, 7) || 'local'}",
        pipeline: "CI / build-and-test",
        duration: "N/A",
        notes: "Automated update from CI test results.",
        summary: {
          total: ${summary.total},
          passed: ${summary.passed},
          failed: ${summary.failed},
          skipped: ${summary.skipped},
          status: "${summary.failed > 0 ? 'warn' : 'pass'}",
        },
        suites: ${JSON.stringify(suites, null, 2)},
        trend: [${summary.failed}, ${summary.failed}, ${summary.failed}, ${summary.failed}, ${summary.failed}, ${summary.failed}, ${summary.failed}],
        failures: ${JSON.stringify(failures.length ? failures : [{ suite: 'All', spec: 'None', failure: 'No failures', status: 'OK' }], null, 2)},
      };`;

  const html = await fs.readFile(dashboardPath, 'utf8');
  const updated = html.replace(/const latest = \{[\s\S]*?\};/, latest);

  if (html === updated) {
    throw new Error('Latest block not updated. Expected pattern not found.');
  }

  await fs.writeFile(dashboardPath, updated, 'utf8');
  console.log('Test dashboard updated:', dashboardPath);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
