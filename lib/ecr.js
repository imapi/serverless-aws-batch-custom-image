const { awsCommand } = require('./awscli');

/**
 * @returns {string} "ECRRepository"
 */
function getECRLogicalId() {
  return "ECRRepository";
}

/**
 * @returns {string} "<serviceName>-<stage>"
 */
function getECRRepositoryName() {
  return `${this.provider.serverless.service.service}`;
}

/**
 * @type {string} "<awsAccountID>.dkr.ecr.us-east-1.amazonaws.com/<serviceName>-<stage>"
 */

let awsAccountID = null;

function getECRRepositoryURL() {
  if (awsAccountID == null) {
      const result = awsCommand(['sts', 'get-caller-identity', '--profile', this.provider.getProfile()]);
      awsAccountID = JSON.parse(result.stdout).Account;
  }
  return `${awsAccountID}.dkr.ecr.${this.provider.getRegion()}.amazonaws.com/${this.provider.naming.getECRRepositoryName()}`
}

module.exports = {
  getECRLogicalId,
  getECRRepositoryName,
  getECRRepositoryURL
}