interface StatusBadgeProps<T extends string> {
  status: T
  statusMap: Record<T, string>
}

export default function StatusBadge<T extends string>({
  status,
  statusMap,
}: StatusBadgeProps<T>) {
  const baseClasses =
    'inline-block px-3 py-[2px] md:py-1 text-xs font-semibold rounded-full text-[8px] md:text-xs h-[20px] md:h-[24px]'

  const colorClasses =
    status === 'Upcoming'
      ? 'bg-gray-500 text-white'
      : status === 'InProgress'
        ? 'bg-primary text-black'
        : 'bg-black text-primary'

  return (
    <div className={`${baseClasses} ${colorClasses}`}>{statusMap[status]}</div>
  )
}
