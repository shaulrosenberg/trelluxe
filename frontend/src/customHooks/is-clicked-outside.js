import { useEffect } from "react"

export const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.onmousedown = (ev) => {
            handleClick(ev)
        }
        return () => {
            document.onmousedown = null
        }
    }, [])
}