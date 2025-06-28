# 📝 TaskManager for Teams

A task management web application built for **office teams** to help streamline task assignment, tracking, and progress updates across **Heads of Departments (HODs)** and **Officials**.

---

##  Features

### 👨‍💼 HOD (Manager) Dashboard
- **Assign Tasks**: Assign tasks to your team members (Officials) with deadlines.
- **Track Assigned Tasks**: View all assigned tasks with their status and remarks from officials.
- **My Tasks**: Manage your own personal tasks. Add, delete, and track them.
- **Weekly Updates**: Add weekly progress notes for personal tasks.
- **Done Tasks**: View all completed personal tasks.

### 👨‍💻 Officer (Team Member) Dashboard
- **View Assigned Tasks**: See all tasks assigned by the HOD.
- **Add Remarks**: Update task status by adding your own remarks.
- **My Tasks**: Manage personal tasks with deadlines, updates, and deletion options.

---

## 💡 Key Highlights
- Role-based login for **HOD** and **Official**
- Clean and intuitive UI for task management
- Separate dashboards based on user roles
- Weekly progress tracking section
- Persistent task history and completion logs

---

## 📂 Folder Structure
```
├── backend/ # Express API for auth, tasks
├── src/ # React frontend source files
├── public/ # Static files
├── .gitignore
├── firebase.json # Firebase Hosting config
└── README.md # Project documentation
```


---

## ⚙️ Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication


---

## 🚧 Setup Instructions

1. **Clone the repo**:
```bash
   git clone https://github.com/goladivya/Taskmanager-for-teams-.git
   ```

   


2.**Install dependencies**:
```bash
    cd backend && npm install
    cd ../ && npm install
```


3. **Environment Setup**:
```bash
Create a .env file .

```

4.**Start the Backend Server**:
```bash
  node backend/server.js
```

5.**Start the Frontend**:
```bash
   npm start
   ```