export const articles = [
  {
    slug: "technical-interviews-that-feel-like-real-work",
    category: "Interview design",
    read: "6 min read",
    title: "Technical interviews that feel like real work",
    excerpt:
      "A useful interview should resemble the work a candidate would actually do with your team.",
    date: "October 21, 2026",
    art: "preview-art-code",
    sections: [
      {
        title: "Start with work that matters",
        body: "The strongest technical prompts are grounded in the decisions your team makes every week. Choose a problem with more than one reasonable approach, then leave room for the candidate to ask questions and explain their choices.",
      },
      {
        title: "Make collaboration part of the exercise",
        body: "An interview is a conversation. Share the prompt, work in the same environment, and invite the candidate to talk through tradeoffs. The goal is to understand how they think, not how quickly they can guess what you want.",
      },
      {
        title: "Evaluate the whole process",
        body: "A passing result is one useful signal. Also consider how the candidate clarifies requirements, handles edge cases, incorporates feedback, and communicates. Agree on those signals before the interview begins.",
      },
    ],
  },
  {
    slug: "a-better-way-to-evaluate-candidates",
    category: "Hiring practice",
    read: "5 min read",
    title: "A better way to evaluate candidates",
    excerpt:
      "Consistent evaluation helps interviewers make clearer decisions and gives candidates a fairer experience.",
    date: "October 14, 2026",
    art: "preview-art-notes",
    sections: [
      {
        title: "Write down the signals first",
        body: "Before meeting a candidate, decide what the role needs and what evidence would demonstrate it. Keep the rubric short enough to use during a real conversation.",
      },
      {
        title: "Separate observation from interpretation",
        body: "Record what happened: the candidate identified a boundary condition, asked for clarification, or revised an approach. Then connect those observations to the role criteria.",
      },
      {
        title: "Compare evidence, not impressions",
        body: "A shared rubric gives the hiring team a common frame of reference. It does not replace judgment; it makes the reasoning behind that judgment easier to discuss.",
      },
    ],
  },
  {
    slug: "what-candidates-wish-interviewers-knew",
    category: "Candidate experience",
    read: "4 min read",
    title: "What candidates wish interviewers knew",
    excerpt:
      "A few thoughtful habits can make technical interviews more human without lowering the bar.",
    date: "October 07, 2026",
    art: "preview-art-candidate",
    sections: [
      {
        title: "Context changes everything",
        body: "Candidates do better work when they understand the goal, the time available, and whether they should think aloud. A short introduction can remove needless uncertainty.",
      },
      {
        title: "Leave room for questions",
        body: "The questions a candidate asks are part of the work. Give them a chance to clarify the prompt and make assumptions explicit.",
      },
      {
        title: "Close the loop with care",
        body: "A clear next step and timely communication show respect for the effort a candidate invested. The interview experience is part of your company’s reputation.",
      },
    ],
  },
];

export const legalCopy = {
  privacy: {
    title: "Privacy notice",
    kicker: "YOUR INFORMATION, WITH CARE",
    updated: "October 2026",
    intro:
      "This draft notice describes the information AtellixEngine may process as the product is developed. It must be updated to match the services, vendors, retention periods, and legal entity used at launch.",
    sections: [
      [
        "Information you provide",
        "Account details such as your name and email address, workspace content, interview materials, and messages you choose to submit. Do not place sensitive personal information in a workspace unless the product explicitly supports it.",
      ],
      [
        "Information collected through use",
        "Basic service and diagnostic information may be generated when you use the product, such as request timestamps, device and browser details, security events, and feature interactions. The final production notice should name the exact data collected and its retention period.",
      ],
      [
        "How information may be used",
        "To provide and secure accounts and workspaces, support collaboration, respond to requests, diagnose service problems, prevent abuse, and improve the product. Any analytics or marketing uses should be described before they are enabled.",
      ],
      [
        "Sharing and service providers",
        "Information may be processed by vendors that help operate the service, subject to appropriate access and contractual controls. The production notice should identify relevant providers, hosting regions, and any international transfers. Workspace information should not be sent to an AI provider unless the feature, provider, and data handling are clearly disclosed.",
      ],
      [
        "Retention and deletion",
        "Information should be retained only as long as needed for the stated purpose or legal requirements. Production retention windows, backup deletion behavior, and account deletion steps must be published here before launch.",
      ],
      [
        "Your choices and contact",
        "You should be able to request access, correction, or deletion where applicable law provides those rights. Contact privacy@atellixengine.com with privacy questions. Replace this draft with reviewed contact and rights procedures before collecting production data.",
      ],
    ],
  },
  terms: {
    title: "Terms of service",
    kicker: "CLEAR EXPECTATIONS",
    updated: "October 2026",
    intro:
      "These draft terms outline expected use of AtellixEngine. They are planning copy and are not yet a binding agreement. Final terms must reflect the operating company, product features, billing, and applicable jurisdictions.",
    sections: [
      [
        "Using the service",
        "Use the service only where it is available and in compliance with applicable law. You are responsible for the accuracy of account details and for keeping your sign-in credentials secure.",
      ],
      [
        "Workspaces and content",
        "You retain rights in content you provide. You grant the service only the limited permissions needed to store, display, and process that content to operate the features you use. Workspace owners are responsible for assigning access thoughtfully.",
      ],
      [
        "Acceptable use",
        "Do not use the service to break the law, interfere with service availability, bypass access controls, access another person’s workspace without authorization, or upload malicious content. Do not submit confidential candidate or employee information unless your organization has established an appropriate lawful basis and product controls.",
      ],
      [
        "Availability and changes",
        "The service may change as it is developed. Any production commitments about availability, support, data export, service levels, or feature deprecation should be stated in a separate agreement.",
      ],
      [
        "Suspension and termination",
        "Access may need to be restricted to protect users, comply with law, or address abuse. A production agreement should explain notice, appeal, data export, and deletion processes.",
      ],
      [
        "Contact",
        "Questions about these draft terms can be sent to legal@atellixengine.com. These details must be confirmed before public launch.",
      ],
    ],
  },
  security: {
    title: "Security at Atellix",
    kicker: "SECURITY IS PART OF THE PRODUCT",
    updated: "October 2026",
    intro:
      "Our product direction treats workspace boundaries, least privilege, and safe execution as foundational requirements. The controls below are design commitments, not a claim that every control is already deployed.",
    sections: [
      [
        "Workspace access",
        "Workspace membership should govern access to files, collaboration rooms, AI context, and execution results. Authorization must be checked by the server for every operation.",
      ],
      [
        "AI and data boundaries",
        "AI assistance should be opt-in, use only the minimum relevant workspace context, and show proposed changes for review. Repository content must be treated as untrusted input. Secrets should not be included in model context by default.",
      ],
      [
        "Isolated code execution",
        "User code should run in short-lived, resource-limited environments with least privilege, default-deny network access, no host credentials, and explicit cleanup. A container alone is not considered sufficient proof of isolation.",
      ],
      [
        "Operational readiness",
        "Before production use, the service needs a documented threat model, vulnerability response process, audit events for sensitive actions, monitoring, backup and recovery procedures, and abuse controls.",
      ],
      [
        "Report a concern",
        "Please send a description of a suspected security issue to security@atellixengine.com. Do not include secrets or other users’ private information in a report. These contact details and response practices must be confirmed before launch.",
      ],
    ],
  },
};
