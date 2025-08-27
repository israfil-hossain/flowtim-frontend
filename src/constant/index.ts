export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const Permissions = {
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",
  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;

export const Brand = [
  {
    name: "Interior Wale",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531932/Interior_Wale-with-bg_a31iag.png",
  },
  {
    name: "Etop",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531907/final_logo_dpma7y.png",
  },
  {
    name: "Fashionpy",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531891/logo_300x100_sqo3wj.png",
  },
  {
    name: "Newsy",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531873/t_newsy-20218145.logowik.com_p3fq6p.webp",
  },
  {
    name: "Raybim",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/t_raybim-technologies6449.logowik.com_dpuuq2.webp",
  },
  {
    name: "Bora",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/bora_hbukhz.webp",
  },
  {
    name: "Quoka",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/quokade_vgrelx.webp",
  },
  {
    name: "Winfuture",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/winfuture_fszyng.webp",
  },
  {
    name: "Vdare",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/t_vdare4797.logowik.com_mrmfg8.webp",
  },
  {
    name: "Kucoin",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741531872/kucoin_eaoxdq.webp",
  },
  {
    name: "flowentrip",
    url: "https://res.cloudinary.com/dpc1nydxn/image/upload/v1741532729/flowentrip-high-resulation_wuco7k.png",
  },
];

export const TESTIMONIALS = [
  {
    content:
      "The AI task prioritization helped me organize projects efficiently. Our team’s delivery speed improved by 35%.",
    author: "Oliver",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    rating: 5,
  },
  {
    content:
      "The collaboration tools and real-time updates keep everyone aligned. Managing remote teams has never been easier.",
    author: "James",
    role: "Team Lead",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 5,
  },
  {
    content:
      "Tracking multiple projects in one dashboard is seamless. Automated reminders and reporting are absolute game-changers.",
    author: "Sofia",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 5,
  },
  {
    content:
      "The document sharing and version control system is brilliant. No more confusion over the latest files or approvals.",
    author: "Isabella",
    role: "Product Owner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 5,
  },
  {
    content:
      "Analytics and progress tracking provide real insights. Helps me make data-driven decisions and plan resources better.",
    author: "Lucas",
    role: "Business Analyst",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    rating: 5,
  },
  {
    content:
      "The task automation and workflow templates are exceptional. Saved me countless hours on repetitive processes.",
    author: "Rafela",
    role: "Scrum Master",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    rating: 5,
  },
];
export const METRICS = [
  {
    number: 120,
    label: "Active Projects",
    image: "/icons/perk-one.svg",
    reverse: false,
  },
  {
    number: 50,
    suffix: "+",
    label: "Team Members",
    image: "/icons/perk-four.svg",
    reverse: true,
  },
  {
    number: 95,
    suffix: "%",
    label: "On-time Delivery",
    image: "/icons/perk-three.svg",
    reverse: false,
  },
  {
    number: 300,
    suffix: "+",
    label: "Tasks Completed",
    image: "/icons/perk-two.svg",
    reverse: true,
  },
];
