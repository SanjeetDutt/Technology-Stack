# Initialize the lerna project
```cmd
npx lerna init
npx lerna init --dryRun (to show logs)
```

# Add a new package
```cmd
npm lerna create <package-name>
```

# Running the project
do the following to run the project
- create a package by using the above command
- Init a project inside it
- give a proper name to it
	- in my case it is portfolio-supabase-main
- in the main project package json add script in it
```json
"scripts": {
	"dev": "lerna run dev --scope=portfolio-supabase-main"
}
```
- here name should be accurate
- lerna will automatically trigger the dev command in the main package

# Linking packages
- Create multiple package with lerna
- My current project setup
	- main package is dependent on portfolio and blog
	- Following in blog package configuration
```json
{ //package.json
    "name": "blog-section", //very important
    "version": "0.0.0",
    "description": "> TODO: description",
    "author": "Sanjeet Dutt <sanjeetdutt@gmail.com>",
    "homepage": "https://github.com/SanjeetDutt/Portfolio-supabase#readme",
    "license": "ISC",
    "main": "src/main.ts", //Very important
    "repository": {
        "type": "git",
        "url": "git+https://github.com/SanjeetDutt/Portfolio-supabase.git"
    },
    "scripts": {
        "build": "tsc" //not needed
    },
    "bugs": { // not needed
        "url": "https://github.com/SanjeetDutt/Portfolio-supabase/issues"
    }
}

{

    "compilerOptions": {
//
        "target": "ES2023", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
       // Target is very important to make things work
        "module": "commonjs", /* Specify what module code is generated. */
        "rootDir": "./src", /* Specify the root folder within your source files. */
        //Declaration map is important as it fix the ts errors
        "declaration": true, /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
        "declarationMap": true, /* Create sourcemaps for d.ts files. */
//Out dir is important and should map with pacakage.json file setting
        "outDir": "./dist", /* Specify an output folder for all emitted files. */
//IDK from here        
        "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
        "strict": true, /* Enable all strict type-checking options. */
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
    }
}
```

- in main package
```json
{
    "name": "main",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "description": "> TODO: description",
    "author": "Sanjeet Dutt <sanjeetdutt@gmail.com>",
    "homepage": "https://github.com/SanjeetDutt/Portfolio-supabase#readme",
    "license": "ISC",
    "main": "dist/main.js",
    "scripts": {
        "dev": "vite --port=3000",
        "build": "tsc -b && vite build",
        "lint": "eslint .",
        "preview": "vite preview"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
// Dependencies injection
        "@portfolio-supabase/portfolio-section": "file:../portfolio",
        "@portfolio-supabase/blog-section": "file:../blog"
    },
    "devDependencies": {
        "@eslint/js": "^9.9.0",
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        "eslint": "^9.9.0",
        "eslint-plugin-react-hooks": "^5.1.0-rc.0",
        "eslint-plugin-react-refresh": "^0.4.9",
        "globals": "^15.9.0",
        "typescript": "^5.5.3",
        "typescript-eslint": "^8.0.1",
        "vite": "^5.4.1"
    }
}
```