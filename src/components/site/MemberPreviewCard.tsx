import type { Member } from "@/data/grafted";

export function MemberPreviewCard({ member }: { member: Member }) {
  const initials = `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`;
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-waters font-serif text-lg text-river-sand">
          {initials}
        </div>
        <div>
          <div className="font-serif text-lg text-deep-waters">
            {member.firstName} {member.lastName}
          </div>
          <div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-refined-gold">
            {member.industry}
          </div>
        </div>
      </div>
      <div className="mt-5 font-serif text-base text-deep-waters">
        {member.businessName}
      </div>
      <p className="mt-2 text-sm text-deep-waters/75">{member.bio}</p>
    </div>
  );
}