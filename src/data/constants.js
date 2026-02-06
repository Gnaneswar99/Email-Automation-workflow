export const COMPANIES = [
  "Google",
  "Meta",
  "Apple",
  "Amazon",
  "Microsoft",
  "Netflix",
  "Stripe",
  "Salesforce",
  "Oracle",
  "Adobe",
];

export const WORKFLOW_STEPS = [
  { id: 1, name: "Research", icon: "Search", desc: "Find recruiter contacts & personalize" },
  { id: 2, name: "Initial Email", icon: "Mail", desc: "Send tailored cold email" },
  { id: 3, name: "Follow-up #1", icon: "RefreshCw", desc: "Gentle nudge after 3-4 days" },
  { id: 4, name: "Follow-up #2", icon: "Zap", desc: "Value-add follow-up after 5-7 days" },
  { id: 5, name: "Final Follow-up", icon: "Target", desc: "Break-up email after 7-10 days" },
];

export const STEP_TO_TEMPLATE = {
  2: "initial",
  3: "followup1",
  4: "followup2",
  5: "final",
};

export const EMAIL_TEMPLATES = {
  initial: {
    subject:
      "{{role}} — Quick intro from a {{experience}}+ year {{specialty}} engineer",
    body: `Hi {{recruiterName}},

I came across your profile while researching {{company}}'s engineering team, and I was impressed by {{personalized_detail}}.

I'm a {{specialty}} engineer with {{experience}}+ years of experience, currently working on {{current_work}}. A few highlights:

- {{achievement_1}}
- {{achievement_2}}
- {{achievement_3}}

I'm particularly excited about {{company}}'s work in {{company_initiative}}, and I'd love to explore how I could contribute.

Would you be open to a quick 15-minute chat this week or next?

Best,
{{yourName}}
{{linkedin_url}}`,
  },
  followup1: {
    subject: "Re: {{role}} — Quick follow-up",
    body: `Hi {{recruiterName}},

I wanted to follow up on my previous email. I know your inbox is busy, so I'll keep this brief.

Since I last reached out, I {{recent_update}} which I think aligns well with what {{company}} is building.

I'd genuinely value even a 10-minute conversation. Would {{specific_day}} work for you?

Thanks,
{{yourName}}`,
  },
  followup2: {
    subject: "Re: {{role}} — Thought you'd find this relevant",
    body: `Hi {{recruiterName}},

I recently {{value_add}} — thought it might be relevant to your team's work at {{company}}.

{{link_or_detail}}

Still very interested in connecting if you have availability this week.

Best,
{{yourName}}`,
  },
  final: {
    subject: "Re: {{role}} — Closing the loop",
    body: `Hi {{recruiterName}},

I don't want to keep filling your inbox, so this will be my last note.

If the timing isn't right for {{company}} right now, I completely understand. I'd still love to stay connected — my door is always open if a {{specialty}} role opens up down the road.

Wishing you and the team all the best.

Cheers,
{{yourName}}
{{linkedin_url}}`,
  },
};