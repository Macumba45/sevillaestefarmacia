export function smoothScrollToNextSection() {
    const currentSection = document.querySelector('.current-section')

    const nextSection =
        currentSection?.nextElementSibling?.querySelector('.section')

    if (nextSection && nextSection.nodeType === Node.ELEMENT_NODE) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
