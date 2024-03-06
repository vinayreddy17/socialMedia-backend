import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
                return;
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(hash);
            });
        });
    });
};


const comparePassword = (password, hashed) =>
{
    return bcrypt.compare(password,hashed)
}
// const comparePassword = async (password, hashed) => {
//     try {

//         const result = await bcrypt.compare(password, hashed);
//         return result;
//     } catch (error) {
//         console.error('Error comparing passwords:', error);
//         throw error;
//     }
// };

export{
    hashPassword,
    comparePassword
}
