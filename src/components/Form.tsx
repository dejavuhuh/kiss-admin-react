import type { CSSProperties, ReactNode, Ref } from 'react'

interface FormProps<T> {
  children: ReactNode
  onSubmit: (values: T) => void
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLFormElement>
}

export function Form<T>({ children, onSubmit, ...props }: FormProps<T>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData(e.target as HTMLFormElement)
        const values = Object.fromEntries(formData.entries()) as T
        onSubmit(values)
      }}
      {...props}
    >
      {children}
    </form>
  )
}
