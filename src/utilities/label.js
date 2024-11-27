export function getLabel() {
    const colors = {
        'normal': 'bi-clipboard2-plus',
        'important': 'bi-star',
        'work': 'bi-suitcase-lg',
        'task': 'bi-journal-text',
        'home': 'bi-house-exclamation',
        'money': 'bi-cash-coin"',
        'shop': 'bi-basket'
    }

    return Object.values(colors)
}