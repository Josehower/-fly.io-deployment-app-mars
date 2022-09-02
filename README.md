## Mars

1. Create your Next,js repo as usual following the learning platform instructions.
2. Get the flyctl auth token:
   - login into your [fly.io account](https://fly.io/app/sign-in)
   - Create a [new fly token](https://fly.io/user/personal_access_tokens) for GitHub actions
   - Add The secret to the GitHub project repo under the name `FLY_API_TOKEN` https://github.com/username/project-slug/settings/secrets/actions/new
3. In the terminal create a fly app with `flyctl apps create`
   - Add the name of the project that you preffer
4. Copy to your project the files .dockerignore, Dockerfile and fly.toml from the configuration files repo

   - Modify `fly.toml` with the name you defined for the app
   - Modify `fly.toml` by deleting the lines refering to the volumes

   Remove the following lines:

   ```diff
   - [mounts]
   -   source = "postgres"
   -   destination = "/postgres-volume"
   ```

5. Deploy first version of the app with `flyctl deploy`
   - User Frankfurt server location
   - Verify the app is running with `flyctl status`
6. Add secrets with the database production credentials to the project (Production credentials should be secure. They will be needed on next steps)

   - Run `flyctl secrets set PGHOST=postgres-app-name.internal PGDATABASE=database2_name PGPASSWORD=this-should-be-a-secure-password PGUSERNAME=user2_name`

7. Stablish a ssh connection to the app with `flyctl ssh console`
8. Conect to the database client with `psql -U postgres postgres -W`
   - Type the password is `postgres`
9. Setup database with secure credentials you added as secrets for the app

   - Test the credentials and the database is workign as expected by running `psql -U $PGUSERNAME -W`
   - Type the password you setted up in the secrets of the app
   - You should start the psql cli in the database you just created not in postgres root:

   Good: ✅

   ```sh
     / $ psql
     psql (14.5)
     Type "help" for help.

     database_name2=#
   ```

   Bad: ❌

   ```sh
     / $ psql
     psql (14.5)
     Type "help" for help.

     postgres=#
   ```

   - close ssh connection

10. Create `flypostbuild` yarn script with the value of `yarn migrate up && yarn start`
11. Update the Dockerfile to use the `flypostbuild` script
12. Redeploy with `flyctl deploy`
    - The app should deploy with no porblems and the database records should be now available on production
13. Copy to your project the directory .github with all its content from the configuration files repo
14. Perform some changes to the app commit and push the changes to the repo. Github actions should deploy a new version of your app successfully
