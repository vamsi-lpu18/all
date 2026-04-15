# Assignment: Student Admission & ID Card Management System



## Overview
Build a web application using **ASP.NET Core MVC** and **ADO.NET** (no Entity Framework) that allows an admin to register students through an admission form, store their photo in the database, and generate a digital ID card.



## Database
Create a `Students` table in SQL Server with the following fields:

- StudentId (Primary Key, auto-increment)
- FirstName, LastName
- DateOfBirth, Gender
- Email (unique), Phone
- Address
- Course, Branch, AcademicYear
- AdmissionDate (auto-set)
- RollNumber (unique, auto-generated)
- Photo stored as **VARBINARY(MAX)** (BLOB)
- PhotoMimeType (to serve the image back)


## Model Properties
The `Student` model must include all the above fields plus an `IFormFile` property (not mapped to DB) to handle photo upload from the form.



## Required Features

1. **Admission Form** — Collect all student details including photo upload (jpg/png only, max 2MB). Auto-generate a unique Roll Number.
2. **Student List** — Display all students in a table with options to View ID Card, Download ID Card, Edit, and Delete.
3. **Edit Student** — Allow updating all fields. If a new photo is uploaded, replace the old one; otherwise retain the existing photo.
4. **Delete Student** — Show a confirmation page before permanently deleting the record.
5. **ID Card View** — Display a styled ID card showing the student's photo, name, roll number, course, branch, and admission date. Include a Print button.
6. **Download ID Card** — Add a Download button on both the student list and the ID card view page. Clicking it should trigger a server-side action that serializes the student data into a formatted HTML file using built-in .NET (`System.Text`, `StringBuilder`, or `XmlSerializer`) — no external libraries. Return the result as a `FileContentResult` with `Content-Type: text/html` and the filename set to the student's roll number (e.g., `CS-2024-001.html`), which the browser will download directly.
7. **Serve Photo** — Create a dedicated action that reads the BLOB from the database and returns it as an image response.



## Frontend Validation Requirements
Apply both **client-side** (jQuery Unobtrusive Validation) and **server-side** (Data Annotations) validation for:

- All text fields are required with minimum length rules
- Email must be in valid format
- Phone must be exactly 10 digits
- Date of birth must be in the past and the student must be between 15-30 years old
- Photo is required on create, and must be jpg/png under 2MB
- Course and Branch must have a valid selection (not the default placeholder)



## Architecture Requirements

- Follow the **Repository Pattern** - create an `IStudentRepository` interface and implement it using raw ADO.NET (`SqlConnection`, `SqlCommand`, `SqlDataReader`).
- Inject the repository into the controller using **Dependency Injection**.
- Store the connection string in `appsettings.json`.
- Separate concerns into Controllers, Models, Repositories, and Views folders.



## Bonus (Optional)
- Search/filter students by name or roll number on the list page.
- Server-side pagination on the student list.
