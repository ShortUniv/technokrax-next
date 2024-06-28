# Running the Code
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Working on the Repo
## Master Branch:

Primary Branch: The master (or main) branch is the primary branch where the source code of HEAD always reflects a production-ready state.
Stable Codebase: It contains the stable version of the code that can be deployed. All features and hotfixes get merged into this branch after thorough testing.

## Build Branch:

Integration and Testing: The build branch can be used for continuous integration and automated testing. Whenever changes are made, they can be pushed to the build branch, where automated build systems compile the code and run tests(todo).
Early Detection of Issues: This helps in early detection of integration issues, build failures, and bugs before merging to the master or release branches.

## Release Branch:

Preparation for Release: The release branch is used to prepare for a new production release. This is where final testing, bug fixes, and documentation updates are done.
Live Testing: This branch can also be used for live testing in a staging environment that closely resembles production. It ensures that the code works as expected in a real-world scenario.
Production Deployment: Once the code in the release branch is stable and has passed all tests, it is deployed to production. The release branch can then be merged into the master branch and tagged with a version number.
Stabilization: It allows for a stabilization period where no new features are added, and the focus is on making the code ready for production.
Versioning: This branch can be tagged with version numbers, making it easy to track different release versions.

## Workflow Example
### Feature Development:
Developers work on feature branches created from the master branch.
Once a feature is complete, it is merged into the build branch for integration testing.

### Integration Testing:
Automated builds and tests run on the build branch to ensure everything integrates correctly.
Release Preparation and Live Testing:
When the build branch is stable and ready for release, it is merged into the release branch.
Final testing and minor fixes are applied in the release branch.
Live testing is conducted in a staging environment.

### Production Deployment:

Once the code in the release branch is ready and has passed live testing, it is deployed to production.
The release branch is then merged into the master branch and tagged with a version number.
The master branch is then deployed to production.
