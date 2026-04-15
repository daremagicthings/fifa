import Link from 'next/link'

type Variant = 'primary' | 'green' | 'default' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-light shadow-sm',
  green:   'bg-green text-white hover:bg-green-light shadow-sm',
  default: 'bg-[#F4F6F9] text-[#0D1117] border border-[#E2E6EC] hover:bg-[#EFF1F5]',
  ghost:   'text-[#4A5260] hover:text-[#0D1117] hover:bg-[#F4F6F9]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

interface ButtonProps extends BaseProps {
  href?: undefined
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

interface LinkProps extends BaseProps {
  href: string
  onClick?: undefined
  type?: undefined
  disabled?: undefined
}

type Props = ButtonProps | LinkProps

export default function Btn({ variant = 'default', size = 'md', className = '', children, ...rest }: Props) {
  const base = `inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-colors cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (rest.href !== undefined) {
    return <Link href={rest.href} className={base}>{children}</Link>
  }

  return (
    <button
      className={base}
      onClick={rest.onClick}
      type={rest.type ?? 'button'}
      disabled={rest.disabled}
    >
      {children}
    </button>
  )
}
