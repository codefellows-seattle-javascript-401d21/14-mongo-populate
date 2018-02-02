### INSTALLATION AND USE:

Run npm init to install the necessary dependencies before running the program. These should include uuid.

This program can be used to have full RESTful functionality on notes. The user can create, update, read, or delete the notes they make.

To start, the user must run the command `node run start:watch`, and then access `localhost:3000/api/v1/note` on another window.

### METHODS:

#### CREATE
Creates a new note using the name and content passed by the user through query strings.

#### UPDATE
Changes the data in an existing note, using data passed through the user with query strings.

#### FETCH ALL
returns all of the notes in memory.

#### FETCH ONE
returns a specific note in memory, specified by its id.

#### DELETE
removes a specific note in memory, specified by its id.
