export const priorityColor = (prior: string) => {
    switch (prior) {
        case 'low': return 'bg-cyan-200'
        case 'medium': return 'bg-yellow-200'
        case 'high': return 'bg-red-200'
        default: return ''
    }
}