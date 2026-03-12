import { AppLayout } from '@/components/layout/AppLayout'
import { PlayerDetailPage } from './PlayerDetailPage'

export default function PlayerDetail({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <PlayerDetailPage playerId={Number(params.id)} />
    </AppLayout>
  )
}
