import { CircularProgress } from '@mui/material'

export default function TableLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <CircularProgress />
    </div>
  )
}
