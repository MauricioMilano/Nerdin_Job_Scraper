const { exec } = require('child_process');

function sendWindowsNotification(message, title = "Notification") {
  //Escape special characters in the message to prevent command injection vulnerabilities.
  const escapedMessage = message.replace(/"/g, '""'); //Escape double quotes

  const command = `msg * "${title}" "${escapedMessage}"`; // * sends to all users on the system
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error sending notification: ${error}`);
      return;
    }
    console.log(`Notification sent: ${stdout}`);
    if (stderr) {
      console.error(`Notification error: ${stderr}`);
    }
  });
}

module.exports = {
  sendWindowsNotification
}