type Variant = 'blue' | 'red' | 'green' | 'gray'

const styles: Record<Variant, string> = {
  blue:  'bg-blue-soft text-blue',
  red:   'bg-red-soft text-red',
  green: 'bg-green-soft text-green',
  gray:  'bg-[#EFF1F5] text-[#4A5260]',
}

interface Props {
  variant?: Variant
  children: React.ReactNode
}

export default function Tag({ variant = 'gray', children }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  )
}
