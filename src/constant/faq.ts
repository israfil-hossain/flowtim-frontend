export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQS: FAQItem[] = [
  {
    question: "How does project creation and tracking work?",
    answer:
      "Our platform makes project management simple. You can create projects, define milestones, assign tasks, and set deadlines through our intuitive interface. Progress is tracked in real time with automated updates and smart reminders.",
  },
  {
    question: "What tools are available for project management?",
    answer:
      "We provide a complete suite of tools including task assignment, time tracking, collaboration boards, file sharing, reporting dashboards, and automated notifications. All features are seamlessly integrated into one platform for better efficiency.",
  },
  {
    question: "How secure is my project data?",
    answer:
      "We use enterprise-grade security with end-to-end encryption, role-based access control, and multi-factor authentication. Your project data, documents, and communications are stored safely with bank-level security standards.",
  },
  {
    question: "Can I manage multiple projects at the same time?",
    answer:
      "Absolutely! Our platform is designed for teams and organizations handling multiple projects. You can switch between projects, organize them by teams or departments, and track performance metrics across all of them from a single dashboard.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 customer support via live chat, email, and phone. Our dedicated support team is always ready to help with technical issues, onboarding, and best practices for effective project management.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, we provide mobile apps for both iOS and Android. You can create tasks, track progress, collaborate with your team, and receive real-time notifications — all on the go.",
  },
];
