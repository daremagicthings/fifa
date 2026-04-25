import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import GroupCard from '@/components/match/GroupCard'
import { GROUPS } from '@/lib/fixtures'

export default function GroupsPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="fade-section">
          <SectionLabel>Group Stage</SectionLabel>
          <h1 className="font-heading font-800 text-3xl text-[#0D1117]">
            12 groups — <span className="hl">simulated</span>
          </h1>
          <p className="text-[#4A5260] mt-2 text-sm">
            Each group is simulated once on load. Refresh for a new set of results.
          </p>
        </div>

        <div className="fade-section fade-delay-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(GROUPS).map(([group, teams]) => (
            <GroupCard key={group} group={group} teams={teams} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
