# FlexischoolsTest

## Running the Application

To run the application, you need to have Node.js, npm or yarn, and React Native CLI installed on your machine. Once you have these prerequisites, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/eingin/FlexischoolsTest.git
cd FlexischoolsTest
yarn
npx pod-install
```

## To start the application:

For Android: `yarn android` or `npm run android`
For iOS: `yarn ios` or `npm run ios`

## Structure

`android/`: This directory contains all the Android-specific code and build files
`ios/`: This directory contains all the iOS-specific code and build files
`lang/`: This directory contains the language files for internationalization.
`src/`: This directory contains all the implementation of the React Native code.
_ `component`: This directory contains all the reusable components used in the application.
_ `hook`: This directory contains all the custom hooks used in the application.
_ `screen`: This directory contains all the screens of the application.
_ `store`: This directory contains all the store related code.
_ `types`: This directory contains all the types used in the application.
_ `Navigation.tsx`: This file contains the navigation configuration for the application.
`App.tsx`: This is the main entry point of the React Native application.

## Approach

The application is of course built using React Native using the CLI and not Expo.
For talking to the Giphy API I used the[ Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) library. This provides a [hook](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery) that handles the incremental loading of items as needed and caches the queries with a clean and easy API.

I spent a bit of time trying to find the best way to render the GIFs. The Giphy API provided GIF, MP4 and Webp urls. I initially tried to used Webp as GIFs are a really old format with bad compression and quality. But they proved difficult to get working on both iOS and Android. They would load the first frame but not animate on iOS. So I decided to use the MP4 links. Much better format for quality and there is a lot of support them. I settled on [react-native-video](https://github.com/react-native-video/react-native-video) with [react-native-video-cache](https://github.com/zhigang1992/react-native-video-cache) to give caching of the MP4 files. This is all fed through a Flatlist component that is reused on both the Trending and Search screens.

For the forms I utilized the [Tanstack Forms](https://tanstack.com/form/latest/docs/overview) library. It allows for headless form management with validation. Zod is used for the actual validation rules. The submissions are stored using [react-native-storage](https://github.com/sunnylqm/react-native-storage).

Keeping inline with best practices The application also uses [i18next](https://www.i18next.com/) for internationalization support.

The Giphy API key is kept in the `.env` file and loaded;provided by [react-native-config](https://github.com/lugg/react-native-config).

## Time Taken

I spent the alloted 4 hours building out the apps features and then just about 15-20 mins extra for a little clean up and writing this readme.

## References and Resources

During the development of this application I used several resources for general reference and understanding. These include the official documentation of React Native, Tanstack Query/Form, and other libraries I described above used in the project. I also used the Giphy API documentation to understand the endpoints and how to use them.
When running into issues with webp/gifs approaches I did some general Googling to see what solutions other people had found. I tired `react-native-fast-image` but it has some other issues with handling the webp format. So i pivoted to using MP4s, a general google of `efficient mp4 react native` pulled up the [react-native-video](https://github.com/react-native-video/react-native-video) library that i ended up using. One note here is that the library does not handle caching of the videos so I also found the [react-native-video-cache](https://github.com/zhigang1992/react-native-video-cache) while looking to handle the caching better. I also did a quick search for a recommendation on storage and found [react-native-storage](https://github.com/sunnylqm/react-native-storage) library for the form submissions.
