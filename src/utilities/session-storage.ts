type Key = 'TOKEN';

function addKeyPrefix(key: string) {
  const prefix = 'WED_WISE_WEB_APP';
  return `${prefix}_${key}`;
}

export function clear() {
  sessionStorage.clear();
}

export function getItem<T>(key: Key): T | null {
  const newKey = addKeyPrefix(key);
  try {
    const stringifiedJson = sessionStorage.getItem(newKey);
    if (stringifiedJson) {
      return JSON.parse(stringifiedJson);
    }
    return null;
  } catch {
    sessionStorage.removeItem(newKey);
    return null;
  }
}

export function removeItem(key: Key) {
  const newKey = addKeyPrefix(key);
  sessionStorage.removeItem(newKey);
}

export function setItem<T>(key: Key, value: T) {
  const newKey = addKeyPrefix(key);
  const stringifiedJson = JSON.stringify(value);
  sessionStorage.setItem(newKey, stringifiedJson);
}
