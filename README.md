# 🏢 Hybrid Work Tracker

A calendar-based attendance tracking application built using **React + Redux Toolkit**.

This tool helps employees track their monthly:

- 🟢 Work From Office (WFO)
- 🔵 Work From Home (WFH)
- 🔴 Leave

It also calculates **monthly WFO compliance (3 days per week rule)** and displays a visual dashboard summary.

---

## 🚀 Live Features

### 📅 Interactive Calendar
- Monthly calendar view
- Navigate between months
- Weekends automatically disabled
- Click any weekday to mark attendance

### 🎯 Attendance Status Options
- WFO
- WFH
- Leave

### 📊 Monthly Summary Dashboard
- Total WFO days
- Total WFH days
- Total Leave days
- WFO Compliance percentage
- Dynamic progress bar

### 💾 Persistent Data
- Data stored in localStorage
- Attendance remains after refresh

---

## 🧠 Business Logic

- 3 WFO days required per week
- Monthly required WFO automatically calculated
- Compliance percentage dynamically updated
- Progress capped at 100%

---

## 🛠 Tech Stack

- React
- Redux Toolkit
- React Redux
- date-fns
- CSS Flexbox & Grid
- LocalStorage

---

## 📂 Project Structure

```
src/
 ├── app/
 │    └── store.js
      └── features/
           └── attendance/
                └── attendanceSlice.js
 ├── components/
 │    └── Calendar.js
 ├── App.js
 └── App.css
```

---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd hybrid-work-tracker
npm install
npm start
```

---

## 📈 Future Enhancements

- Weekly compliance breakdown
- Yearly overview
- Analytics charts
- Export attendance report (PDF)
- Dark mode
- Authentication system

---

## 💡 Why This Project?

This project demonstrates:

- Real-world business rule implementation
- State management using Redux Toolkit
- Derived data calculations
- Dynamic UI rendering
- Clean dashboard layout architecture
- Persistence using localStorage

---

## 👩‍💻 Author

Built as part of React & Redux learning journey.
