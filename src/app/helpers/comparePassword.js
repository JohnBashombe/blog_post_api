import bcrypt from 'bcryptjs';

class CryptPassword {
  static async comparePswd(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

export default CryptPassword;
