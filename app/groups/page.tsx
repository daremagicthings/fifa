import GroupCard from '@/components/match/GroupCard'
import { GROUPS } from '@/lib/fixtures'
import PageTransition from '@/components/ui/PageTransition'

export default function GroupsPage() {
  return (
    <PageTransition>
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="section-title">GROUP STAGE</h2>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="qual-dot" /> Qualified to the Round of 32
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="groups-grid">
            {Object.entries(GROUPS).map(([group, teams]) => (
              <GroupCard key={group} group={group} teams={teams} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
