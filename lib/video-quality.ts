export function calculateVideoQuality() {
  return 90;
}

export function getQueueStatus(value: number) {
  return value >= 90 ? 'approved' : 'queued';
}

export function isUsableTitle(title: string) {
  return title.length > 3;
}
