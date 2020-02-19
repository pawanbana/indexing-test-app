var faker = require("faker");
var _ = require("lodash");
var moment = require("moment");
const domains = require('./domains').domains;


module.exports = {
    usernameGenerate: {
        handler: () => {
            return (faker.name.firstName() + faker.random.uuid());
        }
    },
    emailGenerate: {
        handler: () => {
            let x = faker.internet.email().split('@');
            x[0] = x[0] + faker.name.firstName() + faker.name.lastName();
      
            return x[0] + '+' + faker.random.number({min: 1, max: 12000}) + '@' + domains[Math.floor(Math.random() * domains.length)];
        }
    },
    google_idGenerate: {
        handler: () => {
            let googleId = [null, faker.random.uuid()];
            return googleId[Math.floor(Math.random() * googleId.length)]
        }
    },
    passwordGenerate: {
        handler: () => {
            return faker.random.uuid();
        }
    },
    created_atGenerate: {
        handler: () => {
            return '2014-12-15 13:00:13'
        }
    },
    updated_atGenerate: {
        handler: () => {
            return null;
        }
    },
    nameGenerate: {
        handler: () => {
            return faker.name.firstName()+faker.name.lastName();
        }
    },
    given_nameGenerate: {
        handler: () => {
            return null;
        }
    },
    family_nameGenerate: {
        handler: () => {
            return null;
        }
    },
    pictureGenerate: {
        handler: () => {
            return null;
        }
    },
    genderGenerate: {
        handler: () => {
            return null;
        }
    },
    birthdayGenerate: {
        handler: () => {
            return null;
        }
    },
    localeGenerate: {
        handler: () => {
            return null;
        }
    },
    linkGenerate: {
        handler: () => {
            return null;
        }
    },
    roleGenerate: {
        handler: () => {
            return 'user';
        }
    },
    sync_invitedGenerate: {
        handler: () => {
            return 0;
        }
    },
    sync_eula_acceptedGenerate: {
        handler: () => {
            return 0;
        }
    },
    base_eula_acceptedGenerate: {
        handler: () => {
            return 1;
        }
    },
    latest_versionGenerate: {
        handler: () => {
            return null;
        }
    },
    disabled_syncGenerate: {
        handler: () => {
            return 0;
        }
    },
    ghostGenerate: {
        handler: () => {
            return 0;
        }
    },
    metaGenerate: {
        handler: () => {
            return null;
        }
    },
    enabledGenerate: {
        handler: () => {
            return 1;
        }
    },
    email_verifiedGenerate: {
        handler: () => {
            return 1;
        }
    },
    pro_dashboard_enabledGenerate: {
        handler: () => {
            return 0;
        }
    },
    api_versionGenerate: {
        handler: () => {
            return 1;
        }
    },
    transactionIdGenerate: {
        handler: () => {
            return null;
        }
    },


}