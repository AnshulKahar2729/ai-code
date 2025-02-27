export function groupBy<T, K extends keyof any>(array: T[], keyGetter: (item: T) => K): Record<K, T[]> {
    return array.reduce((result, item) => {
      const key = keyGetter(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as Record<K, T[]>);
  }
  