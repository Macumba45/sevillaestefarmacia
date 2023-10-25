export function smoothScrollToNextSection() {
    const currentSection = document.querySelector('.current-section')
    console.log(currentSection)

    const nextSection =
        currentSection?.nextElementSibling?.querySelector('.section')
    console.log(nextSection)

    if (nextSection && nextSection.nodeType === Node.ELEMENT_NODE) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
