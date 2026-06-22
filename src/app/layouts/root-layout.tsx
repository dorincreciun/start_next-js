import { type ReactNode } from "react"

import { Footer } from "@widgets/footer"
import { Header } from "@widgets/header"

interface RootLayoutProps {
    children: ReactNode
}

export function RootLayoutShell({ children }: RootLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
