<div align="center">

# 📬 ColdReach — Automated Cold Email Workflow

### *A sleek, dark-themed React dashboard to manage and automate your cold email outreach to recruiters at big tech companies.*

<img width="1195" height="995" alt="image" src="https://github.com/user-attachments/assets/9e2ce73e-bc93-453a-b563-93e3e392a229" />


[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/Gnaneswar99/Email-Automation-workflow/pulls)

---


</div>

---

## 🚀 What is ColdReach?

**ColdReach** is a productivity tool designed for **IT professionals** who want to land roles at top tech companies like Google, Meta, Apple, Amazon, Microsoft, and more.

It provides a structured **5-step email outreach pipeline** with ready-to-use templates, contact management, and an analytics dashboard — all in a beautiful dark-themed interface.

> **Problem:** Cold emailing recruiters feels overwhelming and unorganized.  
> **Solution:** ColdReach turns it into a clear, repeatable workflow you can track and manage.

---

## ✨ Key Features

### 📋 Workflow Pipeline
Track every recruiter through a visual 5-step sequence:
| Step | Action | Timing |
|------|--------|--------|
| 🔍 Research | Find recruiter contacts & personalize | Day 0 |
| 📧 Initial Email | Send tailored cold email | Day 1 |
| 🔄 Follow-up #1 | Gentle nudge | Day 4-5 |
| ⚡ Follow-up #2 | Value-add follow-up | Day 9-12 |
| 🎯 Final Follow-up | Break-up email | Day 16-22 |

### 👥 Contact Management
- Add recruiters from **10+ big tech companies** (Google, Meta, Apple, Amazon, Microsoft, Netflix, Stripe, Salesforce, Oracle, Adobe)
- Track each contact's **current step and status**
- Add personalization **notes** per recruiter
- **Delete** contacts when no longer needed

### ✉️ Email Templates
Four professionally crafted, customizable email templates:
- **Initial Email** — First impression with quantified achievements
- **Follow-up #1** — Gentle reminder with new data points
- **Follow-up #2** — Value-add approach (share a blog, project, or insight)
- **Final Email** — Professional break-up email (high reply rate!)

Each template includes:
- **Smart variable substitution** — auto-fills your name, specialty, experience
- **One-click copy** to clipboard
- **Pro tips** for maximizing response rates

### 📊 Analytics Dashboard
- **Real-time stats**: Total, Active, Completed, Responded contacts
- **Pipeline distribution** chart showing contacts at each stage
- **Best practices checklist** for cold email success

### ⚙️ User Profile
- Set your **name, specialty, experience level, and LinkedIn URL**
- Auto-populates into all email templates

---

## 🖼️ Screenshots

<div align="center">

### Workflow Pipeline View
<img width="1137" height="368" alt="image" src="https://github.com/user-attachments/assets/ef546a23-7c74-4ee4-adb8-ff82e7e03ba9" />


### Contact Management
<img width="926" height="621" alt="image" src="https://github.com/user-attachments/assets/741487e4-965c-488a-8078-686df1be29a9" />

<img width="939" height="807" alt="image" src="https://github.com/user-attachments/assets/0ff13082-2926-4a7d-8711-097a0f54bffb" />


### Email Templates with Pro Tips
<img width="1801" height="998" alt="image" src="https://github.com/user-attachments/assets/56db89f7-782b-497a-a864-0d0352078d36" />

### Analytics Dashboard
<img width="961" height="1000" alt="image" src="https://github.com/user-attachments/assets/b7671c09-c6f0-4e5c-b870-2e682dae6bae" />

</div>

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with hooks for state management |
| **Vite 6** | Lightning-fast build tool & dev server |
| **CSS-in-JS** | Inline styles with CSS variables for theming |
| **DM Sans** | Primary typography (Google Fonts) |
| **JetBrains Mono** | Code/template display font |
| **Lucide React** | Icon library |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Gnaneswar99/Email-Automation-workflow.git

# Navigate to project directory
cd Email-Automation-workflow

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173` 🚀

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
coldreach/
├── public/                  # Static assets
├── src/
│   ├── components/          # React UI components
│   │   ├── Header.jsx       # App header with logo & profile toggle
│   │   ├── ProfilePanel.jsx # User profile settings panel
│   │   ├── TabBar.jsx       # Navigation tabs
│   │   ├── WorkflowTab.jsx  # Main pipeline view
│   │   ├── ContactsTab.jsx  # Contact management
│   │   ├── TemplatesTab.jsx # Email templates with copy feature
│   │   └── AnalyticsTab.jsx # Dashboard & best practices
│   ├── data/
│   │   └── constants.js     # Companies, steps, templates data
│   ├── styles/
│   │   └── global.css       # Global styles, animations, theme
│   ├── App.jsx              # Root component with state management
│   └── main.jsx             # App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 How to Use ColdReach

### Step 1: Set Up Your Profile
Click **⚙️ My Profile** in the header and fill in your details:
- Your Name
- Specialty (e.g., Full-Stack, Backend, Frontend, DevOps)
- Years of Experience
- LinkedIn URL

### Step 2: Add Recruiter Contacts
Go to the **👥 Contacts** tab and click **"+ Add Contact"**:
- Enter the recruiter's name, company, role, and email
- Add personalization notes (e.g., "Posted about AI hiring last week")

### Step 3: Work the Pipeline
In the **📋 Workflow** tab:
- See all active contacts with their current step
- Click **"📝 View Email"** to see the template for their current step
- Click **"Next Step →"** to advance them through the sequence

### Step 4: Send Emails
In the **✉️ Templates** tab:
- Review the auto-filled template
- Replace any remaining `{{variables}}` with personalized content
- Click **"📋 Copy Email"** and paste into your email client

### Step 5: Track Progress
In the **📊 Dashboard** tab:
- Monitor your outreach stats
- See pipeline distribution across all steps
- Review best practices to optimize your approach

---

## 💡 Cold Email Best Practices

> These tips are built into the app's Dashboard tab!

1. **Personalize every email** — mention the recruiter's name, a recent company initiative, or their LinkedIn post
2. **Keep it under 150 words** — recruiters skim, respect their time
3. **Send Tue–Thu, 8–10 AM** in the recruiter's timezone
4. **Space follow-ups 3–5 business days** apart
5. **Include a low-commitment CTA** — "Would a 15-min chat work?"
6. **Quantify achievements** — use %, $, scale metrics
7. **Always include your LinkedIn** — recruiters will check it
8. **Break-up emails get replies** — the final email often has the highest response rate

---

## 🗺️ Roadmap

- [ ] 🔐 **Local Storage Persistence** — Save contacts & progress across sessions
- [ ] 📤 **Gmail / Outlook Integration** — Send emails directly from the app
- [ ] 📅 **Scheduling** — Auto-schedule follow-ups based on timing rules
- [ ] 📈 **Email Open Tracking** — Know when recruiters read your emails
- [ ] 🤖 **AI Personalization** — Auto-generate personalized content per recruiter
- [ ] 📱 **Mobile Responsive** — Full mobile support
- [ ] 🌐 **Backend API** — Cloud sync with user authentication
- [ ] 📊 **Advanced Analytics** — Response rate tracking, A/B testing templates

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "feat: add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Gnaneswar**  
- GitHub: [@Gnaneswar99](https://github.com/Gnaneswar99)

---

<div align="center">

### ⭐ If this project helped you, give it a star!

**Built with ❤️ for job seekers targeting big tech**

</div>
