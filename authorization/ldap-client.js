require('dotenv').config();
const { authenticate } = require('ldap-authentication');



async function auth(login, password, callback) {
    let options = {
        ldapOpts: {
            url: process.env.ldap_server,
        },
        adminDn: `${process.env.userId}=${process.env.adminLogin},${process.env.userSuffinx}`,
        adminPassword: process.env.adminPwd,
        userPassword: password,
        userSearchBase: process.env.organization,
        usernameAttribute: process.env.userId,
        username: login,
    }

    try {
        let user = await authenticate(options)
        return callback(null, user);

    } catch (e) {
        return callback(e);
    }
}

module.exports = {
    auth
}

//     // auth with regular user
//     options = {
//         ldapOpts: {
//             url: 'ldap://ldap.forumsys.com',
//             // tlsOptions: { rejectUnauthorized: false }
//         },
//         userDn: 'uid=einstein,dc=example,dc=com',
//         userPassword: 'password',
//         userSearchBase: 'dc=example,dc=com',
//         usernameAttribute: 'uid',
//         username: 'einstein',
//         // starttls: false
//     }
//
//     user = await authenticate(options)
//     console.log(user)
// }


// const authUser = async (login, password) => {
//     const authenticated = await authenticate({
//         ldapOpts: { url: process.env.ldap_server },
//         userDn: `${process.env.userId}=${login},${process.env.userSuffinx}`,
//         userPassword: password,
//         userSearchBase: process.env.organization,
//         usernameAttribute: process.env.userId,
//         username: login,
//     })
// }


// const ldap = require('ldapjs');



// let client;
// const createConnection = (url) => {
//    setClient(ldap.createClient({
//         url
//     }));
//    if (client) {
//        console.log('Ldap Client Connection Succeed');
//    } else {
//        throw new ldapCreateClientException();
//    }
// }
//
// const setClient = ( settingClient ) => {
//     client = settingClient;
// }
//
// const getClient = () => {
//     return client;
// }
//
// const bind = (login, password, callback) => {
//     client.bind(login, password, (err, result) => {
//         if (err) return callback('Wrong Credentials');
//         callback(null, 'Succeed Login');
//     });
// }
//
// const search = (uid) => {
//     console.log('try find user with uid: ' + uid + '\n' + process.env.organization);
//     const options = {
//         filter: `(&(objectClass=person)(uid=${uid}))`,
//         attributes: ['cn', 'mail', 'title', 'givenName', 'sn', 'company']
//     }
//     client.search(process.env.organization, options, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res);
//             res.on('searchEntry', (entry) => {
//                 console.log(`entry: ${entry}`)
//             });
//             res.on('searchReference', (referral) => {
//                 console.log('referral: ' + referral.uris.join());
//             });
//             res.on('error', (err) => {
//                 console.error('error: ' + err.message);
//             });
//             res.on('end', (result) => {
//                 console.log('status: ' + result.status);
//             });
//         }
//     })
// }
//
// ldapCreateClientException = (url) => {
//     this.message = `При создании подключения возникла ошибка. Проверьте url: ${url}`;
// }
// ldapCreateClientException.prototype = Object.create(Error.prototype);
//
// module.exports = {
//     getClient,
//     createConnection,
//     bind,
//     search
// };
