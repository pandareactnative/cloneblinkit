// Android dismisses its system launch screen as the React Native view appears.
export function hideSplash(): Promise<void> {
  return Promise.resolve();
}
