'use client'

import { useServerInsertedHTML } from 'next/dist/client/components/navigation'
import React, { useState } from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode
}) {
    // Only create stylesheet once with lazy initial state
    // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement()
        styledComponentsStyleSheet.instance.clearTag()
        return styles
    })

    if (typeof window !== 'undefined') return <>{children}</>

    return (
        <StyleSheetManager
            shouldForwardProp={isPropValid}
            enableVendorPrefixes={false}
            sheet={styledComponentsStyleSheet.instance}
        >
            {children}
        </StyleSheetManager>
    )
}
