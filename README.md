#  Github Jobs Application for Python developers

This project uses the github jobs API ([Github jobs API](https://jobs.github.com/api)) to display available jobs for Python developers. The application allows paginated results, allows users to filter based on location and also sort the locations

# Live preview

Click here for [live preview](https://github-jobs-app.s3-ap-southeast-1.amazonaws.com/index.html)\
(Application has been deployed to AWS bucket for live preview)

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the application in developer mode, please also use the local development server available at: [local dev server](https://github.com/dineshkp-dev/github_jobs_dev_server)
The configurations can be setup in the '.env.dev' file

### `npm run build`

Builds the app for production to the `build` folder, uses the '.env.prod' file for URL configurations

### `npm run build:deploy`
Builds the production version of the application and deploys to AWS (must configure the AWS with proper authentication)

### `npm run test`

Execute all the tests in the project in watch mode

### `npm run test:coverage`

Execute all the tests and get the coverage (100% coverage)
