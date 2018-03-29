export function transformCatsToSave(items: any[]): any[] {
    return items.map((cat, index) => {
        cat.index = index;
        return cat;
    });
}

export function transformCatsToShow(items: any[]): any[] {
    return items.map((cat, index) => {
        cat.id = cat.index;
        return cat;
    }).sort((a, b) => a.id - b.id);
}
