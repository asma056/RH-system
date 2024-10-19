import { useEffect, useRef, useState } from 'react'
import { InputText, Label } from './style'

interface inputProps {
  onChange: (e: any) => void
  id: string
  value: string
  placeholder: string
  required: boolean
  text?: string
  error?: boolean
  height?: number
}

export function InputTextArea({
  id,
  value,
  placeholder,
  required,
  text,
  onChange,
  error,
  height
}: inputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [scrollbarHeight, setScrollbarHeight] = useState<number>(0)
  const actualHeight = height || 240
  const newHeight =
    scrollbarHeight > actualHeight ? scrollbarHeight : actualHeight
  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        const newScrollbarHeight = inputRef.current.scrollHeight + 1.8
        setScrollbarHeight(newScrollbarHeight)
      }
    }
    handleResize()
  }, [value])
  return (
    <Label id={`label${id}`} htmlFor={id}>
      {text}
      {required && <span>*</span>}
      <InputText
        style={{ height: newHeight }}
        ref={inputRef}
        onChange={onChange}
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        error={error}
      />
    </Label>
  )
}
