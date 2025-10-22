// dyn-select.tsx ensure ref is mutable
const listRef = useRef<HTMLUListElement | null>(null)
// do not reassign ref object, only .current
