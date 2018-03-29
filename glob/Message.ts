export enum Message {
    // Front side messages
    ERROR_FETCHING_COUNTRIES = 'Error while fetching countries',

    // Server side messages
    USER_SIGN_UP_ERROR = 'Error during user creating',
    USER_NOT_FOUND_BY_EMAIL = 'User not found in database by email',
    ENTERED_PASSWORD_INCORRECT = 'Entered password incorrect',
    EMAIL_OR_PASSWORD_INCORRECT = 'Entered email or password is incorrect'
}
