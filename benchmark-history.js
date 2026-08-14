(function () {
  'use strict';

  const STORAGE_KEY = 'benchmark-history-v1';
  const MAX_RESULTS = 1000;

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function save(result) {
    if (!result || !result.benchmark || !result.name || !result.metric) return false;

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      completedAt: new Date().toISOString(),
      benchmark: String(result.benchmark),
      name: String(result.name),
      seed: result.seed == null ? null : String(result.seed),
      timeMs: Number.isFinite(result.timeMs) ? Math.round(result.timeMs) : null,
      attempts: Number.isFinite(result.attempts) ? result.attempts : null,
      metric: {
        label: String(result.metric.label),
        value: Number(result.metric.value),
        suffix: result.metric.suffix ? String(result.metric.suffix) : '',
        decimals: Number.isInteger(result.metric.decimals) ? result.metric.decimals : 0
      },
      details: result.details && typeof result.details === 'object' ? result.details : {}
    };

    if (!Number.isFinite(entry.metric.value)) return false;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...read()].slice(0, MAX_RESULTS)));
      window.dispatchEvent(new CustomEvent('benchmark-result-saved', { detail: entry }));
      return true;
    } catch {
      return false;
    }
  }

  window.BenchmarkHistory = { key: STORAGE_KEY, read, save };
})();
