// password bcrypt
import bcrypt from 'bcrypt';

export const hashPassword  = async (Password)=>{
    try {
        const saltRound  =10;
        const hashedPassword = await bcrypt.hash(Password, saltRound);
        return hashedPassword;

        
    } catch (error) {
        console.log(error)
    }
};


// this middleware is use in the time of login
// compared password take a password and hashed 
export const comparePassword = async (Password, hashedPassword) =>{
    return bcrypt.compare(Password, hashedPassword);
};