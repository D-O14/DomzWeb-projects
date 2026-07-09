# Offline Status Dialog

## purpose
The purpose of an offline status dialog is to inform the user about failure to fetch resources due to lack of an internet connection. The dialog automatically attempts reconnection after a set time, and also gives the user the ability to manually reconnect via a button on the dialog.

## features
- Has timer
- Runs multiple times
- Continously checks online state
- Updates information
- Has button to manually run function

## completed
- [✔] Built the dialog
- [✔] Created a connection failure state
- [✔] Created a connection restored state
- [✔] Created a timer
- [✔] Created a function to check the connection
- [✔] Fetched resources

## to-do
- [] Make dynamic
- [] Animate change of state
- [] Let the browser know about the previous online state
- [] Let the function logic run only once when the connection is restored
- [] Turn into web component

## dependencies
- none

## browser APIs
- Fetch function
- ClearInterval
- SetInterval