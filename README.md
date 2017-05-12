# Microsoft Graph Connect Sample for Node.js

## Table of contents

* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Register the application](#register-the-application)
* [Build and run the sample](#build-and-run-the-sample)
* [Questions and comments](#questions-and-comments)
* [Contributing](#contributing)
* [Additional resources](#additional-resources)

## Introduction

This sample shows how to connect a Node.js app to a Microsoft work or school (Azure Active Directory) or personal (Microsoft) account using the Microsoft Graph API and [the Graph JavaScript SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript) to send an email. In addition, the sample uses the Office Fabric UI for styling and formatting the user experience.

![Microsoft Graph Connect Sample for Node.js screenshot](./public/img/screenshot.png)

## Prerequisites

To use the Microsoft Graph Connect Sample for Node.js, you need the following:

 * [Node.js](https://nodejs.org/) version 4 or 5.

 * Either a [Microsoft account](https://www.outlook.com/) or a [work or school account](http://dev.office.com/devprogram)

## Register the application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**. 
	
   The registration page displays, listing the properties of your app.

4. Copy the Application Id. This is the unique identifier for your app. 

5. Under **Application Secrets**, choose **Generate New Password**. Copy the password from the **New password generated** dialog.

   You'll use the application ID and password (secret) to configure the sample app in the next section. 

6. Under **Platforms**, choose **Add Platform**.

7. Choose **Web**.

8. Enter *http://localhost:3000/token* as the Redirect URI. 

9. Choose **Save**.

## Build and run the sample

1. Download or clone the Microsoft Graph Connect Sample for Node.js.

2. Using your favorite IDE, open **config.js** in */utils*.

3. Replace the **clientId** and **clientSecret** placeholder values with the application ID and password that you copied during app registration.

4. In a command prompt, run the following command in the root directory. This installs the project dependencies.

  ```npm install```

5. Run the following command to start the development server.

  ```node app.js```

6. Navigate to `http://localhost:3000/` in your web browser.

7. Click the **Connect** button.

8. Sign in with your personal or work or school account and grant the requested permissions.

9. Optionally edit the recipient's email address, and then choose the **Send mail** button. When the mail is sent, a Success message is displayed below the button.

## Questions and comments

We'd love to get your feedback about the Microsoft Graph Connect Sample for Node.js using the Graph JavaScript SDK. You can send your questions and suggestions in the [Issues](https://github.com/microsoftgraph/nodejs-connect-sample/issues) section of this repository.

Questions about Microsoft Graph development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/microsoftgraph). Make sure that your questions or comments are tagged with [microsoftgraph].

## Contributing ##

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
  
## Additional resources

- [Other Microsoft Graph Connect samples](https://github.com/MicrosoftGraph?utf8=%E2%9C%93&query=-Connect)
- [Microsoft Graph](http://graph.microsoft.io)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.
# outlook-scheduling
# outlook-scheduling
