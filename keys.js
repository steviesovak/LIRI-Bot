console.log('Keys is loaded');

var twitterKeys = {
  consumer_key: 'jvoKd1Z25wNcIVc271qxvq0jO',
  consumer_secret: 'D3T47iitJcKnOHEDE1RRUH19ITpfzZoBylLIUPdc9rp4JgWUlQ',
  access_token_key: '1028469933087309824-AuscBssBT38TbT0bAt9z5gj34fjLVG',
  access_token_secret: 'vptY8ihZVMNsB20itVn9AZd1QrSyGr4HrNHepcyO3gZu1',
}

module.exports = twitterKeys;

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};