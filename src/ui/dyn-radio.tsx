// dyn-radio.tsx adjust ref typing and defaultValue
const containerRef = useRef<HTMLDivElement>(null)
// ...
<DynRadio
  // ensure defaultValue is string
  defaultValue={defaultValue ?? ''}
/>
