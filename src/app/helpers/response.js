class Response {
  /**
   * success message.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} res
   * @param {*} status
   * @param {*} message
   * @param {*} data
   * @returns {object} data
   * @memberof Response
   */
  static success(res, status, message, data) {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }
  /**
   * error message.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} res
   * @param {*} status
   * @param {*} message
   * @returns {object} data
   * @memberof Response
   */
  static error(res, status, message) {
    return res.status(status).json({ status, message });
  }

  /**
   * ok message.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} res
   * @param {*} status
   * @param {*} message
   * @returns {object} data
   * @memberof Response
   */
  static ok(res, status, message) {
    return res.status(status).json({ status, message });
  }
}

export default Response;
