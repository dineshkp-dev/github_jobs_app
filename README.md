#  Github Jobs Application for Python developers

This project uses the Github jobs API ([Github jobs API](https://jobs.github.com/api)) to display available jobs for Python developers. The application allows paginated results, allows users to filter based on location and also sort the locations.
- Get list of jobs
- The pages can be navigated using 'Next' and 'Previous' buttons
- Filter based on location by entering location name into the filter input field
- Sort the locations by clicking on the 'Locations' column header
- Clicking on the 'Job Title' name provide more details about the job
- In the details page, clicking on the 'Go back' link will bring user back to main page (eg. [Github API detailed information ](https://jobs.github.com/positions/425dc217-8bb6-44ee-bc52-8fa2207b565c.json))

# Live preview

Click here for [live preview](https://github-jobs-app.s3-ap-southeast-1.amazonaws.com/index.html)\
(Application has been deployed to AWS bucket for live preview)

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the application in developer mode, please also use the local development server available at: [local dev server project](https://github.com/dineshkp-dev/github_jobs_dev_server)
The configurations can be setup in the '.env.dev' file

### `npm run build`

Builds the app for production to the `build` folder, uses the '.env.prod' file for URL configurations

### `npm run build:deploy`
Builds the production version of the application and deploys to AWS (must configure the AWS with proper authentication)

### `npm run test`

Execute all the tests in the project in watch mode

### `npm run test:coverage`

Execute all the tests and get the coverage (100% coverage)
