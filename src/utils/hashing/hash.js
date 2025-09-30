import bcrypt from 'bcrypt';


export const hashing = ({plaintext, rounds = Number(process.env.ROUND)}) => {
    return bcrypt.hashSync(plaintext, rounds);
};


export const compareHash = ({plaintext, hash}) => {
    return bcrypt.compareSync(plaintext, hash);
};
