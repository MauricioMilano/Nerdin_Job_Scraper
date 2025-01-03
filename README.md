# Nerdin Job Scraper

This project scrapes job postings from Nerdin.com.br, checks for new postings, and sends Windows notifications if new jobs matching specified criteria are found.

## Features

* Scrapes job postings from a specified URL on Nerdin.
* Filters jobs based on location (São Paulo-SP, São José dos Campos-SP, Home Office).
* Stores scraped data in a JSON file (`vagas_home_office.json`).
* Compares new data with existing data to identify new postings.
* Sends Windows notifications for new job postings.
* Runs as a background process using `pm2`.

## Setup

1. **Install Node.js and npm:** Make sure you have Node.js and npm (or yarn) installed on your system.

2. **Install dependencies:** Navigate to the project directory in your terminal and run:

   ```bash
   npm install
   ```

3. **Configure:**
    * **URL:**  Update the `url` variable in `main.js` to point to the desired Nerdin job search URL.  The example uses a URL that filters for specific job levels.  Adjust as needed to filter by other criteria (city, keyword etc.)
    * **Notification Settings:** The script uses the `msg` command to send Windows notifications. Ensure that the command is available in your system's environment variables.

4. **Run the script:**

   * **Start:** Use the `ligar.bat` batch script to start the scraper as a background process using `pm2`.
   * **Stop:** Use the `desligar.bat` batch script to stop the scraper.

## File Structure

* **`main.js`:** The main script that orchestrates the scraping, comparison, notification, and scheduling processes.
* **`scrapping.js`:** Contains the Puppeteer-based scraping logic.  Handles fetching and parsing job posting data from the Nerdin website.
* **`jsondb.js`:**  Handles reading and writing JSON data to a file for persistence.  Used to store and manage the list of job postings.
* **`notify.js`:**  Contains the logic for sending Windows notifications using the `msg` command.
* **`ligar.bat`:** Batch script to start the scraper using `pm2`.
* **`desligar.bat`:** Batch script to stop the scraper using `pm2`.
* **`utils.js`:** (Not shown but assumed to exist based on imports) Contains utility functions, likely including a `wait` function for pausing execution.


## How it Works

1. **Scraping:** `main.js` calls `scrapeJobPostings` from `scrapping.js` to retrieve job postings from Nerdin.
2. **Filtering:** The scraped data is filtered to keep only jobs meeting specified location criteria.
3. **Comparison:**  The script compares the newly scraped data with the data stored in `vagas_home_office.json`.
4. **Notification:** If new jobs are found, `sendWindowsNotification` in `notify.js` sends a notification.
5. **Persistence:**  The updated job posting data is saved to `vagas_home_office.json` using `jsondb.js`.
6. **Scheduling:** `main.js` uses `wait` to schedule the scraping process to run periodically (currently every 20 minutes).


## Dependencies

* `puppeteer`: For web scraping.
* `pm2`: For running the script as a background process.  (Installed separately)


## Potential Issues

* **Website Changes:** The scraper relies on the structure of the Nerdin website. Changes to the website's HTML might break the scraper. You might need to update the selectors in `scrapping.js` if Nerdin changes its website structure.
* **Rate Limiting:**  Nerdin might block requests if the scraper makes too many requests in a short period. Consider adding delays or using a rotating proxy.
* **Error Handling:**  The code includes some error handling, but more robust error handling might be needed for production use.


## To-Dos

* Add more robust error handling and logging.
* Implement more sophisticated rate limiting.
* Add support for other job boards besides Nerdin.
* Consider using a more sophisticated notification system.
* Add command-line arguments for configuration.


This README provides a comprehensive overview of the project. Remember to adjust the URLs and settings to match your specific requirements.