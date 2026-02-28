  export function resolveLabel<T extends { id: any; name: string }>(id: any, items?: T[]) {
    return items?.find(i => String(i.id) === String(id))?.name ?? undefined;
  }