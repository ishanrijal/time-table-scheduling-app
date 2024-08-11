https://www.figma.com/design/ViOSezh7ZHxNTusXq316qT/Fully-Responsive-Teacher-Dashboard-(Community)?node-id=0-1&t=7rnueOTr9oWP3DWx-0


https://www.figma.com/design/HKycTenE8sCJ5RL53W1dWr/Dance-class-management-web-app-(Community)?node-id=0-1&t=aiht2fukC23wftBy-0


# Login/Registration Page
## Login
  - Fields: Email, Password, Create an account ? Register link
  - Buttons: Login, Register, forgot password
## Registration
  - Fields: First name, last name, Email, Password, confirm password, Already have an account ? Login link
  - Buttons: Register
    
# Dashboard (Admin, Teacher, Student)
  ##  Admin Dashboard
  ### Sections:
  - Dashboard (Summary of schedules, any notification, etc )
      - Sections: List of users with filters (by role: admin, teacher, student)
      - Fields: Name, Email, Role
      - Buttons: Add User, Edit, Delete
  - Student Management (Add/Edit/Delete users)
  - Teacher Management (Add/Edit/Delete users)
  - Module Management (Add/Edit/Delete classes)
      - Sections: List of classes with filters
      - Fields: Module Name, Teacher, Room, Time Slot, Mode of Delivery (Online/Physical)
      - Buttons: Add Class, Edit, Delete
  - Room Management
      - Sections: List of rooms with filters
      - Fields: Room Name, Capacity, Availability
      - Buttons: Add Room, Edit, Delete
  - Generate Timetable
      - Sections: Generation Status, Options (constraints like break times, max classes per day)
      - Buttons: Generate Timetable, View Conflicts
  - Calendar
    - Buttons: Export Timetable (PDF, CSV)
  - Conflict
      - Sections: List of conflicts
      - Fields: Conflict Type, Details, Resolution Status
      - Buttons: Resolve Conflict
## Teacher Dashboard
### Sections:
- Dashboard (Summary of their schedule)
- Availability Management (Set their availability)
- Calendar
- View Students
## Student Dashboard
### Sections:
- Dashboard (Summary of their schedule)
- View Timetable
- Edit Profile
