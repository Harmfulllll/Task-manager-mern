/*
 * Title: apiResponse.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 15:54:10
 */

class apiResponse {
  constructor(status, data, message = "Success") {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
export default apiResponse;
