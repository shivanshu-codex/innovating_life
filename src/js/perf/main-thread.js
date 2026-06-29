/* ============================================
   LUMINA — MAIN THREAD PROTECTION
   Break long tasks into chunks so the browser
   can respond to user input between them.
   ============================================ */

// Yield control back to the browser between work chunks
export async function yieldToMain() {
  if ('scheduler' in window && 'yield' in window.scheduler) {
    return window.scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Process a large list without blocking the main thread
export async function processLargeList(items, processFn, chunkSize = 10) {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(processFn));
    await yieldToMain();
  }
  return results;
}

// Web Worker wrapper with Promise API
export class LuminaWorker {
  constructor(scriptPath) {
    this.worker = new Worker(scriptPath, { type: 'module' });
    this.pending = new Map();
    this.nextId = 0;

    this.worker.addEventListener('message', ({ data }) => {
      const { id, result, error } = data;
      const handlers = this.pending.get(id);
      if (!handlers) return;
      this.pending.delete(id);
      if (error) handlers.reject(new Error(error));
      else handlers.resolve(result);
    });

    this.worker.addEventListener('error', (e) => {
      // Reject all pending promises if the worker crashes
      this.pending.forEach(({ reject }) => reject(e));
      this.pending.clear();
    });
  }

  run(task, data) {
    return new Promise((resolve, reject) => {
      const id = ++this.nextId;
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ id, task, data });
    });
  }

  terminate() {
    this.worker.terminate();
    this.pending.clear();
  }
}
