# Getting to know the application under test (AUT)

Before we start configuring Cypress and writing automated test scripts, let me introduce you to the application we are going to test throughout this course.

The application is called TAT Customer Service Center - [**TAT CSC**](https://tat-csc.s3.sa-east-1.amazonaws.com/index.html), and it was developed using HTML, CSS, and JavaScript.

## Application features

The TAT CSC application simulates sending messages to a customer service center.

### Required fields

The following fields are mandadtory, and **must** be filled in before sending the message:

- First name (text type field)
- Last name (text type field)
- Email (email type field, **with validation**)
- How can we help you? Any praise or feedback for us? (text area field)

### Other fields

In addition to the mandatory fields, the "customer" can input:

- Phone (number type field)
- Product (drop-down field with the options: Blog, Courses, Mentorship, or YouTube)
- Type of service (radio-type fields with the options: ​​Help, Praise, or Feedback)
- Preferred means of contact (checkbox fields with the options: Email and/or Phone)
- Attach a file (file type field)

### Rules of preferred means of contact

- When the phone checkbox is checked, the phone number input becomes mandatory
- When unchecking the phone checkbox, the phone number input is no longer mandatory

### Privacy Policy

By clicking on the [Privacy Policy](https://tat-csc.s3.sa-east-1.amazonaws.com/privacy.html) link at the bottom of the page, it opens in new browser tab.

### Messages

⚠️ If there is a problem related to the required fields, the following message is displayed with a yellow background: `Validate the required fields!`

✅ When the form is successfully submitted, the following message is displayed with a green background: `Message successfully sent.` Also, all fields revert to their initial state.

> Both messages are displayed for only three seconds. After that, they disappear.

## Your challenge

During the course, I challenge you to test all the features of the TAT CSC application, in addition to setting up a continuous integration workflow that runs when changes are sent to GitHub, and integration with Cypress Cloud, to benefit from testing analytics, test management, test replays, and more.

I hope you are as eager to get started as I am to guide you along the way! 🧑‍🏫

Go to [lesson 0](./0.md) to setup the test project.
