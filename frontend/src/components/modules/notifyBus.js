// Simple event bus for notifications and loading state shared across non-React modules

const subscribers = {
  toast: new Set(),
  loadingInc: new Set(),
  loadingDec: new Set(),
};

export function subscribeToast(handler) {
  subscribers.toast.add(handler);
  return () => subscribers.toast.delete(handler);
}

export function subscribeLoadingInc(handler) {
  subscribers.loadingInc.add(handler);
  return () => subscribers.loadingInc.delete(handler);
}

export function subscribeLoadingDec(handler) {
  subscribers.loadingDec.add(handler);
  return () => subscribers.loadingDec.delete(handler);
}

export function emitToast(payload) {
  subscribers.toast.forEach((h) => {
    try { h(payload); } catch {
        console.error('Error in emitToast:', payload);
    }
  });
}

export function emitLoadingInc() {
  subscribers.loadingInc.forEach((h) => {
    try { h(); } catch {
        console.error('Error in emitLoadingInc');
    }
  });
}

export function emitLoadingDec() {
  subscribers.loadingDec.forEach((h) => {
    try { h(); } catch {
        console.error('Error in emitLoadingDec');
    }
  });
}

// Convenience helpers
export function toastError(message) {
  emitToast({ type: 'error', message });
}

export function toastInfo(message) {
  emitToast({ type: 'info', message });
}

export function toastSuccess(message) {
  emitToast({ type: 'success', message });
}


