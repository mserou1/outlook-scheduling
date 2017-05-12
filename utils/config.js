/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

module.exports = {
    creds: {
        callbackURL: 'http://localhost:3000/token',
        clientID: '5131b3dd-25a5-4ae8-a250-9e4ac4ca9398',
        clientSecret: 'FrTnRSQwhT4qFuL9XgrZGYd',
        identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        skipUserProfile: true,
        responseType: 'code',
        validateIssuer: false,
        responseMode: 'query',
        scope: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared', 'Contacts.Read', 'Contracts.Read.Shared', 'Contracts.ReadWrite', 'Contracts.ReadWrite.Shared', 'User.Read']
    }
};
