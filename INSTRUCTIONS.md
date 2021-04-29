## Instructions

===================
FAST & BASIC START.
===================
1. First thing first - Make sure you have YouTube API key for the v3 version.
2. Open the project in IDE (Current to 18/02/2021 I'm using VSCode).
3. Open the following file in the src/settings/settings.js file.
4. Go to 'VIDEO_ID' and enter there the YouTube video Id from which to fetch all the comments.
5. In 'API_KEY_PATH' - Place the path to the JSON file with the YouTube API key. An example for the JSON file can be found
   in 'misc/examples' directory.
7. Next - Time to install the NPM packages. In the terminal run 'npm i'. It will install automatically all the required NPM packages.
8. In the terminal run 'npm start'. If everything goes well, you will start to see the console status line appear.
9. If you see any error - Need to check what's changed. Current to 18/02/2021, it works fine.
10. If you see the console status line but the 'Writing comments' not progressing - Need to check what's wrong.
11. If no errors and the progress works OK, make sure to check on dist that the TXT file was created successfully.
12. Successful running application on production should look like this:

/* cSpell:disable */
===IMPORTANT SETTINGS===
VIDEO_ID: y1STthONg-c
API_BASE_URL: https://www.googleapis.com/youtube/v3/
DIST_FILE_NAME: comments
MAXIMUM_COMMENTS_COUNT: 100000
MILLISECONDS_FETCH_DELAY_COUNT: 1000
MAXIMUM_FETCH_COMMENTS_COUNT: 100
========================
OK to run? (y = yes)
y
===VALIDATE GENERAL SETTINGS===
===INITIATE THE SERVICES===
===FETCH COMMENTS===
===Writing comments: 11,201/16,993 | 65.92%===
===EXIT: FINISH===

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverFlow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://il.linkedin.com/in/orassayag